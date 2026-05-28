import { useState } from "react";
import toast from "react-hot-toast"; // Importa la función toast de react-hot-toast para mostrar notificaciones al usuario
import config from "../config"; // Importa la configuración de la aplicación, que incluye la URL de la API

// Hook personalizado para manejar el análisis de texto, que incluye el estado de los resultados, el estado de carga y la función para realizar el análisis
export function useFetchAnalisis() {
  const [resultados, setResultados] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Agregar esta función antes de "const analizar"
  const validarTexto = (texto) => {
    if (texto.length < 10) return "El texto debe tener al menos 10 caracteres.";
    if (texto.length > 1000)
      return "El texto no puede superar los 1000 caracteres.";

    const soloPermitidos = /^[\w\s\.,;:!?áéíóúÁÉÍÓÚüÜñÑ\-\(\)\"\'\n]+$/;
    if (!soloPermitidos.test(texto))
      return "El texto contiene caracteres no permitidos (emojis o símbolos).";

    const patronesMaliciosos = [
      /<[^>]*>/,
      /(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE)\s/i,
      /(script|javascript|onerror|onload|eval|alert)\s*[(:]/i,
      /(--|\bOR\b|\bAND\b)\s+\d+=\d+/i,
    ];
    for (const patron of patronesMaliciosos) {
      if (patron.test(texto))
        return "El texto contiene contenido no permitido.";
    }

    return null; // sin errores
  };
  // Función para realizar el análisis del texto, que valida el input, realiza la solicitud a la API y maneja las respuestas y errores de manera adecuada
  const analizar = async (texto) => {
    if (!texto.trim()) {
      toast.error("Por favor ingresa un texto");
      return;
    }

    const error = validarTexto(texto);
    if (error) {
      toast.error(error);
      return;
    }

    // Inicia la carga y muestra una notificación de que el análisis está en progreso
    setIsLoading(true);
    try {
      // Realiza la solicitud POST a la API para analizar el texto, utilizando toast.promise para mostrar notificaciones de carga, éxito o error de manera automática
      const response = await toast.promise(
        fetch(`${config.apiUrl}/analisis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto }),
        }),
        {
          loading: "Analizando texto...",
          success: "Análisis completado",
          error: (err) => err.message || "Error al conectar con el servidor",
        },
      );
      // Verifica si la respuesta de la API es exitosa (status 200-299), y si no lo es, lanza un error para ser manejado en el bloque catch
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la solicitud");
      }

      // Convierte la respuesta a JSON y verifica si contiene los resultados esperados, actualizando el estado de los resultados o lanzando un error si la respuesta es inválida
      const responseData = await response.json();
      if (responseData.ok && responseData.resultados) {
        setResultados(responseData.resultados);
      } else {
        console.error(
          "Error:",
          responseData.error || "Respuesta inválida del servidor",
        );
        throw new Error(
          responseData.error || "Respuesta inválida del servidor",
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Retorna el estado de los resultados, el estado de carga y la función para realizar el análisis, que pueden ser utilizados por los componentes que consumen este hook
  return { resultados, isLoading, analizar };
}
