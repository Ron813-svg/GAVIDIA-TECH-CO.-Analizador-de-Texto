import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../config";


const useFetchHistorial = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistorial = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/analisis/historial`);
      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      setHistorial(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return { historial,  loading, error };
}

export default useFetchHistorial;
