import { useState, useEffect, use } from 'react' 
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
// Importación de imagenes, estilos y componentes
import heroImg from '../assets/Logo.jpeg'
import { useFetchAnalisis } from '../hooks/useFetchAnalisis' // Hook personalizado para manejar el análisis de texto
import useFetchHistorial from '../hooks/useFetchHistorial' // Hook personalizado para manejar el historial de análisis
import HistorialModal from '../components/modal.jsx' // Componente del modal para mostrar detalles del análisis
import '../components/historial.css' // Estilos para el historial
import './mainPage.css' // Estilos responsive para la página principal
import LoadingScreen from '../components/LoadingScreen/LoadingScreen.jsx' // Componente de la pantalla de carga

function MainPage() {
  const { resultados, isLoading, analizar } = useFetchAnalisis() // Hook para manejar el análisis de texto
  const { historial, loading, error, getHistorial } = useFetchHistorial() // Hook para manejar el historial de análisis
  const [selectedItem, setSelectedItem] = useState(null) // Estado para el item seleccionado del historial

  // Configuración del formulario con react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { texto: '' },
  })

  // Carga el historial de análisis al montar el componente
   useEffect(() => {
    getHistorial();
  }, []);

  // Recarga el historial automáticamente cada vez que llega un nuevo resultado
  useEffect(() => {
    if (resultados) {
      getHistorial();
    }
  }, [resultados])

  if (loading) return <LoadingScreen message='Cargando...' />
  if (error) return <div className="error-message">Error: {error}</div>

  // Función para manejar el envío del formulario de análisis
  const onSubmit = (data) => {
    analizar(data.texto)
    reset()
  }
  
  // Renderizado del componente principal
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

        {/* Formulario para ingresar el texto a analizar */}
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
        {/* Muestra los resultados del análisis si existen */}
        {resultados && (
          <section className="results">
            <h3>Resultados del análisis</h3>
            <div className="results-grid">
              <div className="result-item">
                <span className="result-label">Palabras:</span>
                <span className="result-value">{resultados.Palabras}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Letras:</span>
                <span className="result-value">{resultados.Letras}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Números:</span>
                <span className="result-value">{resultados.Numeros}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Espacios:</span>
                <span className="result-value">{resultados.Espacios}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Líneas:</span>
                <span className="result-value">{resultados.Lineas}</span>
              </div>
            </div>
          </section>
        )}

        <section className="historial-section">
          <div className="historial-header">
            <h2>Historial de análisis</h2>
            <button
              className="historial-btn"
              onClick={getHistorial} // Botón para recargar el historial manualmente
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
                  onClick={() => setSelectedItem(item)} // Abrir modal con detalles al hacer clic en el item del historial
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