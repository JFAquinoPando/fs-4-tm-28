import React, { useState, useEffect } from "react";
import { ListaAnime } from "./componentes/ListaAnime.jsx";
import { BuscarAnime } from "./componentes/BuscarAnime.jsx";
import { BrowserRouter as Touchel, Route as Ruta, Switch as Cambiar, Link }
    from "react-router-dom";
import { MiLayout } from "./layouts/MiLayout.jsx";
import { ResultadosAnime } from "./componentes/ResultadosAnime.jsx";
import { Otro } from "./paginas/Otro.jsx";
import { Anime } from "./paginas/Anime.jsx";
import { NoEncontrado } from "./paginas/NoEncontrado.jsx";
import { VerAnimes } from "./paginas/VerAnimes.jsx";
import { useStorage } from "./utils/useStorage.js";
import { useFetch } from "./utils/useFetch.js";
import { useHome } from "./utils/useHome.js";
import { usePaginaTotal } from "./store/zustand.js";
import { Sesion } from "./paginas/Sesion.jsx";
import { Registro } from "./paginas/Registro.jsx";

function Proyecto() {

    const { paginaActual, totalPaginas, cambiarPagina, cambiarTotalPaginas } = usePaginaTotal()

    useEffect(() => {
        let items = useStorage("animes", "obtener")
        console.log("itemsx?", items);
        
        if (!items || items.length === 0 || items.trim() === "") {
            // Si no hay datos, fetch desde la API
            useHome().then(() => {
                // Después de que useHome() termine, leer los datos actualizados
                let datosActualizados = useStorage("animes", "obtener")
                cambiarTotalPaginas(JSON.parse(datosActualizados)?.paginacion?.last_visible_page || 1)
                cambiarPagina(JSON.parse(datosActualizados)?.paginacion?.current_page || 1)
            })
        } else {
            // Si hay datos en storage, usar esos
            cambiarTotalPaginas(JSON.parse(items)?.paginacion?.last_visible_page || 1)
            cambiarPagina(JSON.parse(items)?.paginacion?.current_page || 1)
        }
    }, [])

    // Escuchar cambios de página y hacer fetch de esa página
    useEffect(() => {
        if (paginaActual > 0) {
            useFetch(`https://api.jikan.moe/v4/anime?page=${paginaActual}`)
                .then((resultado) => {
                    const guardar = resultado?.data?.map((anime) => ({
                        nombre: anime.title,
                        imagen: anime.images.webp.image_url,
                        trailer: anime.trailer,
                        episodios: anime.episodes,
                        estado: anime.status,
                        al_aire: anime.aired,
                        duracion: anime.duration,
                        audiencia: anime.rating,
                        sinopsis: anime.synopsis,
                        puntuacion: anime.score
                    }))

                    const todo = {
                        data: guardar,
                        paginacion: resultado.pagination
                    }

                    useStorage("animes", "guardar", JSON.stringify(todo))
                    setLista(guardar)
                })
        }
    }, [paginaActual])

    const [lista, setLista] = useState(
        JSON.parse(useStorage("animes", "obtener"))?.data ?? []
    )

    console.log("lista desde APP:", lista);


    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Touchel>
                <MiLayout lista={lista} setLista={setLista}>
                    <Cambiar>
                        <Ruta exact path="/">
                            <ResultadosAnime lista={lista} />
                        </Ruta>
                        <Ruta path="/pagina/:nroPagina">
                            <ResultadosAnime lista={lista} />
                        </Ruta>
                        <Ruta exact path="/otro">
                            <Otro />
                        </Ruta>
                        <Ruta path={`/anime/:idAnime`}>
                            <Anime />
                        </Ruta>
                        <Ruta path={`/mi-lista`}>
                            <VerAnimes />
                        </Ruta>
                        <Ruta path={`/sesion`}>
                            <Sesion />
                        </Ruta>
                        <Ruta path={`/registro`}>
                            <Registro />
                        </Ruta>
                        <Ruta path="*">
                            <NoEncontrado />
                        </Ruta>
                    </Cambiar>
                </MiLayout>
            </Touchel>
        </div>
    )
}

export default Proyecto;