const config = {
  apiUrl: import.meta.env.VITE_API_URL || (
    import.meta.env.DEV 
      ? 'http://localhost:5000' 
      : 'https://gavidia-tech-co-analizador-de-texto.onrender.com'
  ),
}

export default config
