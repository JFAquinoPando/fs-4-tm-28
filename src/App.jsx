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


function Proyecto() {
    const [lista, setLista] = useState([])

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