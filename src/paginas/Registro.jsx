import { Link } from "react-router-dom"

export const Registro = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-6xl mb-4">😡</h1>
            <h2 className="text-4xl font-bold">Estamos en otra ruta v2</h2>
            <Link className="text-yellow-400 mt-6 inline-block hover:underline" to="/">Volver al inicio</Link>
        </div>
    )
}