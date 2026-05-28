import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Renderiza la aplicación principal dentro del elemento con id 'root', utilizando StrictMode para ayudar a identificar problemas potenciales en la aplicación durante el desarrollo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
