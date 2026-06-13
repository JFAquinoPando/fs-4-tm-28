import { useState } from "react"
import { Link } from "react-router-dom"
import { useStorage } from "../utils/useStorage"

export const Sesion = () => {


    const [correo, setCorreo] = useState("")
    const [clave, setClave] = useState("55555")

    const handleChange = (e, setModificador) => {
        setModificador(e.target.value)
    }

    const handleSubmit = (evento) => {
        evento.preventDefault()
        console.log("Esto fue enviado", correo, clave, evento);
        const enviar = new FormData(evento.target)
        enviar.append("clave-secreta", clave)
        fetch("http://127.0.0.1:3000/usuarios", {
            method: evento.target.method,
            body: enviar
        }).then(
            peticion => peticion.json()
        ).then(
            respuesta => {
                if (respuesta?.respuesta === "ok") {
                    useStorage("sesion","guardar", respuesta.datos)
                }else{
                    alert("Credenciales inválidas")
                }
            }
        )
    }

    return (
        <div className="text-center py-20">
            <h1 className="text-6xl mb-4">Inicio de sesión</h1>
            <form method="post" className="" onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <input type="email" name="correo" id="correo" value={correo} onChange={(e) => handleChange(e, setCorreo)} />
                </div>
                <div>
                    <label htmlFor="clave">Contraseña:</label>
                    <input type="password"  id="clave" value={clave} onChange={(e) => handleChange(e, setClave) } />
                </div>
                <button>Iniciar</button>
            </form>
            <Link className="text-yellow-400 mt-6 inline-block hover:underline" to="/">Volver al inicio</Link>
        </div>
    )
}