import { useState } from "react"
import { Imagen } from "./Imagen.jsx";

export function Tarjeta({ titulo, imagen, rating, tiempo, carrito, setCarrito }) {

  const [chequeado, setChequeado] = useState(false)

  function handleClick() {
    agregarAnime(titulo)
    setChequeado(!chequeado)
  }

  function agregarAnime(anime) {
    setCarrito((prevCarrito) => {
      return [...prevCarrito, anime]
    })
  }


  return <article
    className="border rounded-3xl 
    bg-gray-800 overflow-hidden flex gap-6
    flex-col justify-between
    ">
    <figure className="overflow-hidden">
      <Imagen titulo={titulo} fuente={imagen} estado={chequeado} />
    </figure>
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-3xl">{titulo}</h3>
      <ul className="text-3xl flex flex-col gap-4">
        <li><strong>Audiencia</strong>:{rating}</li>
        <li><strong>Tiempo</strong>:{tiempo}</li>
      </ul>
    </div>
    <button
      className={
        chequeado === true
          ? `bg-green-700 text-blue-100 w-full p-4 border text-2xl`
          : `bg-amber-300 text-black w-full p-4 border text-2xl`
      }
      onClick={handleClick}>{chequeado === true ? "AGREGADO 🆗" : "Agregar 👜"}</button>
  </article>
}
