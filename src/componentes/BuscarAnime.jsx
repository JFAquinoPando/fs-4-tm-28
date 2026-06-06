import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { usePaginaTotal } from "../store/zustand.js";
import { useFetch } from "../utils/useFetch.js";
import { useStorage } from "../utils/useStorage.js";


export const BuscarAnime = ({ buscar, listado }) => {
    const URI_API = "https://api.jikan.moe/v4/anime?q"
    const localizacion = useLocation()
    const [texto, setTexto] = useState("")
    
     const { paginaActual, totalPaginas, cambiarPagina, cambiarTotalPaginas }
    = usePaginaTotal()

    useEffect(function () {
        // Solo ejecutar búsqueda si estamos en la ruta "/" (home) y hay texto
        if (localizacion.pathname !== "/") {
            return
        }

        // Si no hay texto, limpiar resultados
        if (!texto.trim()) {
            buscar(JSON.parse(useStorage("animes", "obtener")).data)
            console.log("desde BuscarAnime", listado);
            
            return
        }

        // Debounce: esperar 800ms antes de hacer la petición
        const temporizador = setTimeout(async () => {
            try {
                const respuesta = await useFetch(`${URI_API}=${texto}&page=${paginaActual}`)
                /* const peticion = await fetch(`${URI_API}=${texto}&page=${paginaActual}`)
                const respuesta = await peticion.json() */
                console.log(respuesta);
                
                
                const nuevaLista = respuesta.data.map((item) => ({
                    id: item.mal_id,
                    nombre: item.title,
                    imagen: item.images.webp.image_url,
                    rating: item.rating,
                    duracion: item.duration
                })) || []
                cambiarTotalPaginas(respuesta?.pagination?.last_visible_page || 1)
                cambiarPagina(respuesta?.pagination?.current_page || 1)


                buscar(nuevaLista)
            } catch (error) {
                console.error("Error buscando anime:", error)
                buscar([])
            }
        }, 800)

        // Limpieza: cancela el timeout si el usuario sigue escribiendo
        return () => clearTimeout(temporizador)

    }, [texto, localizacion.pathname, buscar, paginaActual])


    return <div className="relative w-full">
        <input type="text"
            className="w-full bg-white text-black py-1.5 px-4 pl-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-zinc-500"
            placeholder="Buscar en AnimeDB..."
            value={texto}
            onChange={(evento) => {
                    setTexto(evento.target.value)
            }}
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
}