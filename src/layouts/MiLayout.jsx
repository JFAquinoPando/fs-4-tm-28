import { Link } from "react-router-dom"
import { BuscarAnime } from "../componentes/BuscarAnime.jsx"
import { ListaAnime } from "../componentes/ListaAnime.jsx";
import { useState } from "react";
import { Menu } from "../componentes/Menu.jsx";
import { usePaginaTotal } from "../store/zustand.js";


export function MiLayout({ children, lista, setLista }) {
    const { paginaActual, totalPaginas, cambiarPagina, cambiarTotalPaginas }
    = usePaginaTotal()
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
                        <BuscarAnime buscar={setLista} listado={lista}  />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}                
            </main>
            <footer className="bg-red-600">
                {
                    (totalPaginas > 1) ? 
                    [...new Array(totalPaginas)].map((e, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                           cambiarPagina(idx + 1) 
                        }}
                        className={`text-amber-50 text-3xl p-2 ${
                            paginaActual === (idx +1) ? "bg-green-950" : ""
                        }`}
                    >
                        Página {idx + 1}
                    </button>))
                    : <></> 
                }
            </footer>
        </>
    )
}