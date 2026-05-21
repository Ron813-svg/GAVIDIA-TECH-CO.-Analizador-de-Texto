import { useState } from 'react'
import toast from 'react-hot-toast'
import config from '../config'

export function useFetchAnalisis() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const analizar = async (texto) => {
    if (!texto.trim()) {
      toast.error('Por favor ingresa un texto')
      return
    }

    setIsLoading(true)
    try {
      const response = await toast.promise(
        fetch(`${config.apiUrl}/analisis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ texto }),
        }),
        {
          loading: 'Analizando texto...',
          success: 'Análisis completado',
          error: 'Error al conectar con el servidor',
        }
      )

      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }

      const responseData = await response.json()
      if (responseData.ok && responseData.resultados) {
        setResults(responseData.resultados)
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { results, isLoading, analizar }
}