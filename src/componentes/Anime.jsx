import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import imagenPlaceholder from "./../../public/placeholder.webp";
import { NoEncontrado } from "./NoEncontrado";

export const Anime = () => {

    let { idAnime } = useParams()
    const URI_API = "https://api.jikan.moe/v4/anime"
    const [datos, setDatos] = useState({
        nombre: "",
        imagen: imagenPlaceholder,
        trailer: "",
        episodios: 0,
        estado: "",
        fecha_emision: "",
        fecha_cierre: "",
        duracion: "",
        sinopsis: "",
        audiencia: "",
        puntuacion: 0
    })
    const [codigo, setCodigo] = useState(200)

    useEffect(function () {
        async function pedirDatos() {
            const peticion = await fetch(`${URI_API}/${idAnime}`)
            const respuesta = await peticion.json()
            if (respuesta.status !== undefined) {
                setCodigo(respuesta.status)
            }
            const {
                title : nombre,
                images: imagen,
                trailer,
                episodes: episodios,
                status: estado,
                aired: al_aire,
                duration: duracion,
                rating: audiencia,
                synopsis: sinopsis,
                score: puntuacion
            } = respuesta.data

            setDatos({
                nombre,
                imagen: imagen.webp.image_url,
                trailer: respuesta,
                episodios,
                estado,
                fecha_emision: al_aire.from,
                fecha_cierre: al_aire.to,
                duracion,
                sinopsis,
                audiencia,
                puntuacion
            })
        }
        pedirDatos()
    }, [])


    return codigo === 200 ? (
        <div className="min-h-screen bg-black text-white pb-12">
            {/* Header de la Película/Anime */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 py-8 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{datos.nombre}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
                                <span>{datos.estado}</span>
                                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                <span>{datos.episodios} Episodios</span>
                                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                <span>{datos.duracion}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-8">
                            <div className="text-center">
                                <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-1">Puntuación</p>
                                <div className="flex items-center gap-2">
                                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                    <div>
                                        <span className="text-2xl font-bold">{datos.puntuacion}</span>
                                        <span className="text-zinc-500 text-sm">/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
                            <img src={datos.imagen} alt={datos.nombre} className="w-full object-cover" />
                        </div>
                    </div>

                    {/* Info Principal */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Sinopsis */}
                        <section>
                            <h2 className="text-xl font-bold border-l-4 border-yellow-400 pl-4 mb-4 uppercase tracking-wider">Sinopsis</h2>
                            <p className="text-zinc-300 leading-relaxed text-lg">
                                {datos.sinopsis}
                            </p>
                        </section>

                        {/* Detalles Técnicos */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-zinc-800">
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Audiencia</span>
                                <span className="text-blue-400">{datos.audiencia}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Estado</span>
                                <span>{datos.estado}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Emisión</span>
                                <span>{new Date(datos.fecha_emision).toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">Episodios</span>
                                <span>{datos.episodios}</span>
                            </div>
                        </section>

                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-md transition-colors w-fit flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            Añadir a Watchlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <NoEncontrado />
    )
}