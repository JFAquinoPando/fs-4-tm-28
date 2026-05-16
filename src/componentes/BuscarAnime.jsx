import { useEffect, useState } from "react"

export const BuscarAnime = ({ buscar, listado }) => {
    const URI_API = "https://api.jikan.moe/v4/anime?q"

    const [texto, setTexto] = useState("")

    useEffect(function () {
        async function pedirDatos() {
            const peticion = await fetch(`${URI_API}=${texto}`)
            const respuesta = await peticion.json()
            const nuevaLista = respuesta.data.map((item) => {
                return {
                    nombre: item.title,
                    imagen: item.images.webp.image_url,
                    rating: item.rating,
                    duracion: item.duration
                }
            })

            buscar(nuevaLista)
        }
        pedirDatos()
    }, [texto])


    return <search className="flex gap-3 container mx-auto pt-2">
        <input type="text"
            className="bg-amber-100 px-1 w-64 text-xl" placeholder="Ej: Naruto"
            value={texto}
            onChange={(evento) => { setTexto(evento.target.value) }}
        />
        {/* <button
            className="border py-3 px-4 bg-green-700 text-2xl rounded-2xl">
            Buscar
        </button> */}
    </search>
}