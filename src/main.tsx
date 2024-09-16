import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../src/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App nombre={"Alan"} apellido="Rodas" edad={5}/>
  </StrictMode>,
)

// Ejemplo de asignación desestructurada.
const persona = { nombre: "Alan", apellido: "Rodas" };
const { nombre } = persona;
