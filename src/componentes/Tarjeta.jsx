import { Imagen } from "./Imagen.jsx";
import { Link } from "react-router-dom";
import { useStorePropio } from "../store/zustand.js";

export function Tarjeta({ titulo, imagen, rating, tiempo, id }) {

  const { carritox, agregarCarrito, quitarCarrito } = useStorePropio()
  
  // Verificar si el anime ya está en el carrito
  const chequeado = carritox.some(anime => anime.id === id)

  function handleClick() {
    if (chequeado) {
      quitarCarrito(id)
    } else {
      agregarCarrito({
        id,
        titulo,
        imagen,
        rating,
        tiempo
      })
    }
  }


  return <article
    className="bg-zinc-900 rounded-lg overflow-hidden flex flex-col h-full border border-zinc-800 hover:bg-zinc-800 transition-colors group
    ">
    <figure className="relative overflow-hidden aspect-[2/3]">
      <Link to={`/anime/${id}`}>
        <Imagen titulo={titulo} fuente={imagen} estado={chequeado} />
      </Link>
      <div className="absolute top-2 left-2">
        <button
          onClick={handleClick}
          className={`p-2 rounded-sm backdrop-blur-md transition-colors ${chequeado ? 'bg-yellow-400 text-black' : 'bg-black/40 text-white hover:bg-black/60'
            }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </figure>

    <div className="p-3 flex flex-col flex-1 gap-2">
      <div className="flex items-center gap-1.5 text-sm">
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-zinc-400">{rating || "N/A"}</span>
      </div>
      <Link to={`/anime/${id}`}>
        <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {titulo}
        </h3>
      </Link>

      <p className="text-xs text-zinc-500 mt-auto">
        {tiempo}
      </p>
    </div>

    <button
      className={
        chequeado === true
          ? `bg-zinc-800 text-yellow-400 w-full py-2.5 text-sm font-bold border-t border-zinc-700`
          : `bg-zinc-800/50 text-blue-400 w-full py-2.5 text-sm font-bold border-t border-zinc-700 hover:bg-zinc-700 transition-colors`
      }
      onClick={handleClick}>
      {chequeado === true ? "✓ En lista" : "+ Watchlist"}
    </button>
  </article>
}
