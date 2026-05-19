import { useState } from 'react'
import { useForm } from 'react-hook-form'
import heroImg from './assets/Logo.jpeg'
import config from './config'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      texto: '',
    },
  })

  const texto = watch('texto')

  const onSubmit = async (data) => {
    if (!data.texto.trim()) {
      alert('Por favor ingresa un texto')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${config.apiUrl}/analisis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: data.texto }),
      })

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
      alert('Error al analizar el texto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={heroImg} alt="Gavidia Logo" className="logo" />
        <h1>Gavidia</h1>
        <p>Tech CO</p>
      </header>

      <main className="main-content">
        <section className="description">
          <p>
            Este analizador de texto simple permite analizar un texto ingresado y que muestra estadísticas básicas como cantidad de palabras, letras, números, espacios y líneas.
          </p>
        </section>

        <section className="instructions">
          <h2>Instrucciones de uso</h2>
          <ol>
            <li>Escribe o pega tu texto en el cuadro principal.</li>
            <li>Presiona el botón "Analizar Texto".</li>
            <li>El sistema mostrará automáticamente los resultados del análisis.</li>
            <li>Puedes modificar el texto y volver a analizarlo las veces que quieras.</li>
          </ol>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="analyzer">
            <textarea
              {...register('texto')}
              placeholder="Ingrese o pegue texto copiado..."
              className="text-input"
            ></textarea>
            
            <button 
              type="submit" 
              className="analyze-button"
              disabled={isLoading}
            >
              {isLoading ? 'Analizando...' : 'Analizar texto'}
            </button>
          </section>
        </form>

        {results && (
          <section className="results">
            <h3>Resultados del análisis</h3>
            <div className="results-grid">
              <div className="result-item">
                <span className="result-label">Palabras:</span>
                <span className="result-value">{results.Palabras}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Letras:</span>
                <span className="result-value">{results.Letras}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Números:</span>
                <span className="result-value">{results.Numeros}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Espacios:</span>
                <span className="result-value">{results.Espacios}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Líneas:</span>
                <span className="result-value">{results.Lineas}</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
