import { Link } from "react-router-dom"
import { BuscarAnime } from "../componentes/BuscarAnime.jsx"
import { ListaAnime } from "../componentes/ListaAnime.jsx";
import { useState } from "react";
import { Menu } from "../componentes/Menu.jsx";


export function MiLayout({ children, lista, setLista }) {
    return (
        <>
            <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center gap-8">
                    {/* Logo estilo IMDb */}
                    <Link to="/" className="bg-yellow-400 text-black font-black px-2 py-1 rounded-md text-xl tracking-tighter">
                        ANIME<span className="bg-black text-yellow-400 px-1 ml-0.5 rounded-sm">DB</span>
                    </Link>

                    <Menu />

                    <div className="flex-1 max-w-2xl">
                        <BuscarAnime buscar={setLista} listado={lista} />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}                
            </main>
        </>
    )
}