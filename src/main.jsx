import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProyectoX from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProyectoX />
  </StrictMode>,
)
