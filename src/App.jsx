import React, { useState, useEffect } from "react";
import { ListaAnime } from "./componentes/ListaAnime.jsx";
import { BuscarAnime } from "./componentes/BuscarAnime.jsx";


function Proyecto() {

    const [lista, setLista] = useState([])

    return <>
        <BuscarAnime buscar={setLista} listado={lista} />
        <section
            className="text-amber-100 grid grid-cols-1 md:grid-cols-3 
                container mx-auto gap-4">
            <ListaAnime listado={lista} />
        </section>
    </>

}

export default Proyecto;