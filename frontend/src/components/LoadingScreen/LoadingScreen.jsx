import React from 'react';
import './LoadingScreen.css';

// Componente para mostrar una pantalla de carga con un mensaje personalizado
const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
