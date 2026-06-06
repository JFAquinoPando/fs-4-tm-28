import React, { useState, useEffect } from "react";
import { ListaAnime } from "./componentes/ListaAnime.jsx";
import { BuscarAnime } from "./componentes/BuscarAnime.jsx";
import { BrowserRouter as Touchel, Route as Ruta, Switch as Cambiar, Link }
    from "react-router-dom";
import { MiLayout } from "./layouts/MiLayout.jsx";
import { ResultadosAnime } from "./componentes/ResultadosAnime.jsx";
import { Otro } from "./componentes/Otro.jsx";
import { Anime } from "./componentes/Anime.jsx";
import { NoEncontrado } from "./componentes/NoEncontrado.jsx";
import { VerAnimes } from "./componentes/VerAnimes.jsx";
import { useStorage } from "./utils/useStorage.js";
import { useFetch } from "./utils/useFetch.js";


function Proyecto() {
    useEffect(() => {
        let items = useStorage("animes", "obtener")
        if (!items.length) { // ---> !0 ===> !false ---> true

            useFetch("https://api.jikan.moe/v4/anime")
                .then(
                    function (resultado) {
                        console.log("REVISAR",resultado);
                        
                        const guardar = resultado?.data?.map(
                            (anime) => {
                                return {
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
                                }
                            }
                        )

                        const todo = {
                            data: guardar,
                            paginacion: resultado.pagination
                        }


                        useStorage("animes", "guardar", JSON.stringify(todo))
                    }
                )
        }
    }, [])
    const [lista, setLista] = useState(
        JSON.parse(useStorage("animes", "obtener")).data
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