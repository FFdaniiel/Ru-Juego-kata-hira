import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Estilos globales
import './index.css'

// No necesitamos importar las fuentes aquí, las manejaremos en index.css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)