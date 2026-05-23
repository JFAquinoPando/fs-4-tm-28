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
                    id: item.mal_id,
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


    return <div className="relative w-full">
        <input type="text"
            className="w-full bg-white text-black py-1.5 px-4 pl-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-zinc-500" 
            placeholder="Buscar en AnimeDB..."
            value={texto}
            onChange={(evento) => { setTexto(evento.target.value) }}
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
}