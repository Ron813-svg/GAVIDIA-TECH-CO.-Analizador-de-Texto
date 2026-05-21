import { useState } from "react";
import toast from "react-hot-toast";
import config from "../config";

export function useFetchHistorial() {
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const obtenerHistorial = async () => {
    setIsLoading(true);
    try {
      const response = await toast.promise(
        fetch(`${config.apiUrl}/analisis/historial`),
        {
          loading: "Cargando historial...",
          success: "Historial cargado",
          error: "Error al cargar el historial",
        },
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const responseData = await response.json();
      if (responseData.ok && responseData.historial) {
        setHistorial(responseData.historial);
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { historial, obtenerHistorial, isLoading };
}
