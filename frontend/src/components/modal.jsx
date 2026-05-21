import './modal.css'

function HistorialModal({ item, onClose }) {
  if (!item) return null

  const r = item.resultados ?? {}

  const parseFecha = () => {
    const raw = item.createdAt ?? item.fecha ?? null

    if (raw) {
      const d = new Date(raw)
      if (!isNaN(d)) return d.toLocaleString('es-SV', { dateStyle: 'long', timeStyle: 'short' })
    }

    if (item._id && typeof item._id === 'string' && item._id.length >= 8) {
      const timestamp = parseInt(item._id.substring(0, 8), 16) * 1000
      const d = new Date(timestamp)
      if (!isNaN(d)) return d.toLocaleString('es-SV', { dateStyle: 'long', timeStyle: 'short' })
    }

    return 'Fecha no disponible'
  }

  const fecha = parseFecha()

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
            <span className="modal-stat-value">{r.Palabras ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Letras</span>
            <span className="modal-stat-value">{r.Letras ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Números</span>
            <span className="modal-stat-value">{r.Numeros ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Espacios</span>
            <span className="modal-stat-value">{r.Espacios ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Líneas</span>
            <span className="modal-stat-value">{r.Lineas ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Caracteres totales</span>
            <span className="modal-stat-value">{r.Caracteres_totales ?? r['Caracteres totales'] ?? '—'}</span>
          </div>
          <div className="modal-stat-item">
            <span className="modal-stat-label">Sin espacios</span>
            <span className="modal-stat-value">{r.Caracteres_sin_espacios ?? r['Caracteres sin espacios'] ?? '—'}</span>
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