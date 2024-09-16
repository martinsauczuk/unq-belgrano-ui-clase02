import React from 'react'

export type AppProps = {
    nombre: string,
    apellido: string,
    edad: number
}

export const App: React.FC<AppProps> = ({ nombre, apellido }) =>
    <>
        <h1>Hola {nombre} {apellido}</h1>
        <h2>Bienvenido a la app</h2>
    </>

