import { Link } from "react-router-dom"
import { BuscarAnime } from "../componentes/BuscarAnime.jsx"
import { ListaAnime } from "../componentes/ListaAnime.jsx";
import { useState } from "react";
import { Menu } from "../componentes/Menu.jsx";
import { usePaginaTotal } from "../store/zustand.js";


export function MiLayout({ children, lista, setLista }) {
    const { paginaActual, totalPaginas, cambiarPagina, cambiarTotalPaginas }
        = usePaginaTotal()


    const ubicacionesBotones = {
        inicio: 1,
        final: totalPaginas
    }

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
            <footer className="bg-zinc-900 border-t border-zinc-800 sticky bottom-0">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
                    {
                        (totalPaginas > 1) ?
                            <>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (paginaActual > ubicacionesBotones.inicio) {
                                                cambiarPagina(paginaActual - 1)
                                            }
                                        }}
                                        className={`px-4 py-2 rounded font-semibold transition-all ${
                                            paginaActual === ubicacionesBotones.inicio
                                                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                                                : "bg-yellow-400 text-black hover:bg-yellow-500"
                                        }`}
                                    >
                                        ← Anterior
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (paginaActual < ubicacionesBotones.final) {
                                                cambiarPagina(paginaActual + 1)
                                            }
                                        }}
                                        className={`px-4 py-2 rounded font-semibold transition-all ${
                                            paginaActual === ubicacionesBotones.final
                                                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                                                : "bg-yellow-400 text-black hover:bg-yellow-500"
                                        }`}
                                    >
                                        Siguiente →
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label htmlFor="cambia-pagina" className="text-zinc-200 font-medium">
                                        Página:
                                    </label>
                                    <select
                                        id="cambia-pagina"
                                        value={paginaActual}
                                        onChange={(evento) => {
                                            cambiarPagina(Number(evento.target.value))
                                        }}
                                        className="bg-zinc-800 text-yellow-400 px-3 py-2 rounded border border-zinc-700 hover:border-yellow-400 focus:border-yellow-400 focus:outline-none cursor-pointer"
                                    >
                                        {
                                            [...new Array(totalPaginas)].map((e, idx) => (
                                                <option key={idx + 1} value={idx + 1}>
                                                    {idx + 1} de {totalPaginas}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </>
                            :
                            <></>
                    }
                </div>
            </footer>
        </>
    )
}