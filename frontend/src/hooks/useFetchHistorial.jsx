import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../config"; // Importa la configuración de la aplicación, que incluye la URL de la API

// Custom hook para manejar el historial de análisis
const useFetchHistorial = () => {
  const [historial, setHistorial] = useState([]); // Estado para almacenar el historial de análisis
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando el historial
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra durante la carga del historial

  // Función para obtener el historial de análisis desde el backend
  const getHistorial = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.apiUrl}/analisis/historial`); // Endpoint para obtener el historial de análisis

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }
      const data = await response.json(); // Convierte la respuesta a JSON y verifica si contiene el historial esperado, actualizando el estado del historial o lanzando un error si la respuesta es inválida

      // Verifica si la respuesta del servidor es válida y contiene el historial, actualizando el estado del historial o lanzando un error si la respuesta es inválida
      if (data.ok && data.historial) {
        setHistorial(data.historial);
      } else {
        throw new Error(data.error || "Respuesta inválida del servidor");
      }
      // Maneja cualquier error que ocurra durante la solicitud, actualizando el estado de error para ser mostrado en la interfaz de usuario
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error al conectar con el servidor");
      toast.error(error.message || "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };
  return { historial, loading, error, getHistorial };
};

export default useFetchHistorial;
