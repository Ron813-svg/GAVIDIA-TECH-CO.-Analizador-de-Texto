import { useState, useEffect, use } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import heroImg from '../assets/Logo.jpeg'
import { useFetchAnalisis } from '../hooks/useFetchAnalisis'
import useFetchHistorial from '../hooks/useFetchHistorial'
import HistorialModal from '../components/modal.jsx'
import '../components/historial.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen.jsx'

function MainPage() {
  const { results, isLoading, analizar } = useFetchAnalisis()
  const { historial, loading, error  } = useFetchHistorial()
  const [selectedItem, setSelectedItem] = useState(null)
  

  const { register, handleSubmit } = useForm({
    defaultValues: { texto: '' },
  })

  if (loading) return <LoadingScreen message='Cargado ....'></LoadingScreen>
  if (error) return <div className="error-message">Error: {error}</div>

  const onSubmit = (data) => {
    analizar(data.texto)
  }
  
  return (
    <div className="container">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

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

        <section className="historial-section">
          <div className="historial-header">
            <h2>Historial de análisis</h2>
            <button
              className="historial-btn"
              onClick={historial}
              disabled={loading}
            >
              {loading ? 'Cargando...' : '↻ Actualizar'}
            </button>
          </div>

          {historial.length === 0 ? (
            <p className="historial-empty">No hay registros aún. Presiona "Actualizar" para cargar.</p>
          ) : (
            <ul className="historial-list">
              {historial.map((item, index) => (
                <li
                  key={item.id ?? index}
                  className="historial-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <span className="historial-item-index">#{index + 1}</span>
                  <span className="historial-item-preview">
                    {item.texto
                      ? item.texto.slice(0, 50) + (item.texto.length > 50 ? '…' : '')
                      : 'Sin texto'}
                  </span>
                  <span className="historial-item-words">{item.resultados?.Palabras ?? '?'} palabras</span>
                  <span className="historial-item-arrow">›</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {selectedItem && (
        <HistorialModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

export default MainPage