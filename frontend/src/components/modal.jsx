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
    <div className="hmodal-overlay" onClick={onClose}>
      <div className="hmodal" onClick={(e) => e.stopPropagation()}>

        <div className="hmodal-header">
          <h2>Detalle del análisis</h2>
          <button className="hmodal-close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="hmodal-fecha">📅 {fecha}</p>

        <div className="hmodal-stats-grid">
          <div className="hmodal-stat-item">
            <span className="hmodal-stat-label">Palabras</span>
            <span className="hmodal-stat-value">{r.Palabras ?? '—'}</span>
          </div>
          <div className="hmodal-stat-item">
            <span className="hmodal-stat-label">Letras</span>
            <span className="hmodal-stat-value">{r.Letras ?? '—'}</span>
          </div>
          <div className="hmodal-stat-item">
            <span className="hmodal-stat-label">Números</span>
            <span className="hmodal-stat-value">{r.Numeros ?? '—'}</span>
          </div>
          <div className="hmodal-stat-item">
            <span className="hmodal-stat-label">Espacios</span>
            <span className="hmodal-stat-value">{r.Espacios ?? '—'}</span>
          </div>
          <div className="hmodal-stat-item">
            <span className="hmodal-stat-label">Líneas</span>
            <span className="hmodal-stat-value">{r.Lineas ?? '—'}</span>
          </div>
        </div>

        {item.texto && (
          <div className="hmodal-texto-section">
            <p>Texto analizado</p>
            <div className="hmodal-texto-content">{item.texto}</div>
          </div>
        )}

      </div>
    </div>
  )
}

export default HistorialModal