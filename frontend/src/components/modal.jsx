import './modal.css'

function HistorialModal({ item, onClose }) {
  if (!item) return null

  const fecha = item.fecha
    ? new Date(item.fecha).toLocaleString('es-SV', {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    : 'Fecha no disponible'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Detalle del análisis</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="modal-fecha">📅 {fecha}</p>

        <div className="modal-stats-grid">
          <div className="modal-stat-item">
            <span className="modal-stat-label">Palabras</span>
            <span className="modal-stat-value">{item.palabras ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Letras</span>
            <span className="modal-stat-value">{item.letras ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Números</span>
            <span className="modal-stat-value">{item.numeros ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Espacios</span>
            <span className="modal-stat-value">{item.espacios ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Líneas</span>
            <span className="modal-stat-value">{item.lineas ?? '—'}</span>
          </div>
        </div>

        {item.texto && (
          <div className="modal-texto-section">
            <p>Texto analizado</p>
            <div className="modal-texto-content">{item.texto}</div>
          </div>
        )}

      </div>
    </div>
  )
}

export default HistorialModal