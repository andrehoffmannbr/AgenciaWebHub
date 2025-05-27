// import React from 'react' // Comentado junto com StrictMode
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // TEMPORARIAMENTE DESABILITADO PARA TESTAR META PIXEL
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
) 