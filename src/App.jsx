import React, { useState } from "react";


function Imagen({fuente, titulo, estado}){
  return <img src={fuente} alt={titulo} title={titulo} 
  className={`w-full transition hover:scale-110 object-cover h-80 
    ${estado === true ? "hue-rotate-180 invert-20" : "" }`} />
}

function Tarjeta({ titulo, imagen, rating, tiempo }) {

  const [chequeado, setChequeado] = useState(false)

  function handleClick() {
    setChequeado(!chequeado)
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

function ListaAnime() {
  const lista = [
    {
      nombre: "Bleach",
      imagen: "https://myanimelist.net/images/anime/1541/147774.jpg",
      rating: "PG-13 - Teens 13 or older",
      duracion: "24 min per ep"
    },
    {
      nombre: "Bleach: Thousand-Year Blood War",
      imagen: "https://myanimelist.net/images/anime/1908/135431.jpg",
      rating: "R - 17+ (violence & profanity)",
      duracion: "24 min per ep"
    },
    {
      nombre: "Bleach: Thousand-Year Blood War - The Separation",
      imagen: "https://myanimelist.net/images/anime/1164/138058.jpg",
      rating: "R - 17+ (violence & profanity)",
      duracion: "24 min per ep"
    },
    {
      nombre: "Bleach the Movie: Memories of Nobody",
      imagen: "https://myanimelist.net/images/anime/1834/134488.jpg",
      rating: "PG-13 - Teens 13 or older",
      duracion: "1 hr 32 min"
    }
  ]

  return lista.map(
    function (anime, indice) {
      return <Tarjeta
        key={indice}
        titulo={anime.nombre}
        imagen={anime.imagen}
        rating={anime.rating}
        tiempo={anime.duracion}
      />
    }
  )
}


function Proyecto() {
  return <section className="text-amber-100 grid grid-cols-1 md:grid-cols-3 container mx-auto gap-4">
    <ListaAnime />
  </section>

}

export default Proyecto;