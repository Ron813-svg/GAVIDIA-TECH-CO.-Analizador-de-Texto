import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../config";

// Custom hook para manejar el historial de análisis
const useFetchHistorial = () => {
  const [historial, setHistorial] = useState([]); // Estado para almacenar el historial de análisis
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando el historial
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra durante la carga del historial

  // Función para obtener el historial de análisis desde el backend
  const fetchHistorial = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.apiUrl}/analisis/historial`); // Endpoint para obtener el historial de análisis
      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();

      if (data.ok && data.historial) {
        setHistorial(data.historial); 

      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return { historial, loading, error, fetchHistorial };
};

export default useFetchHistorial;
