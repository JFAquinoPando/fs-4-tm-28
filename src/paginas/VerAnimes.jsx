import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { useStorePropio } from "../store/zustand.js";


export const VerAnimes = () => {
    const { carritox, quitarCarrito } = useStorePropio()

    return (
        <>
            <h1 className="text-amber-50 text-6xl text-center">Mi listado de animes</h1>
            {carritox.length === 0 ? (
                <p className="text-zinc-400 text-center mt-8">No hay animes en tu lista</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {carritox.map((anime) => (
                        <div key={anime.id} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 p-4">
                            <Link to={`/anime/${anime.id}`}>
                                <img
                                    src={anime.imagen}
                                    alt={anime.titulo}
                                    className="w-full h-48 object-scale-down rounded mb-3"
                                />
                                <h3 className="text-amber-50 font-bold mb-2 line-clamp-2">{anime.titulo}</h3>
                            </Link>
                            <p className="text-sm text-zinc-400 mb-1">⭐ {anime.rating || 'N/A'}</p>
                            <p className="text-xs text-zinc-500 mb-3">{anime.tiempo}</p>
                            <button
                                onClick={() => quitarCarrito(anime.id)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-bold transition-colors"
                            >
                                Quitar de lista
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}