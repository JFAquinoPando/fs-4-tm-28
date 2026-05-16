import React, { useState, useEffect } from "react";
import { useStorage } from "./utils/useStorage.js";
import { BotonIncrementar } from "./componentes/BotoIncrementar.jsx";
import { Imagen } from "./componentes/Imagen.jsx";
import { Tarjeta } from "./componentes/Tarjeta.jsx";
const URI_API = "https://api.jikan.moe/v4/anime?q=bleach"


function ListaAnime() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    async function pedirDatos() {
      const peticion = await fetch(URI_API)
      const respuesta = await peticion.json()
      const nuevaLista = respuesta.data.map((item) => {
        return {
          nombre: item.title,
          imagen: item.images.webp.image_url,
          rating: item.rating,
          duracion: item.duration
        }
      })

      setLista(nuevaLista)
    }
    pedirDatos()
  }, [])


  /* const lista = [
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
  ] */

  const [carrito, setCarrito] = useState([])

  useStorage("listado_v2", "guardar", JSON.stringify(lista))

  return [
    <div>
      <h3 className="text-amber-300 text-4xl">Listado en carrito</h3>
      <ul>
        {carrito.map((item, index) => {
          return <li key={index} className="text-3xl">{item}</li>
        })}
      </ul>
    </div>
    , lista.map(
      function (anime, indice) {
        return <Tarjeta
          key={indice}
          titulo={anime.nombre}
          imagen={anime.imagen}
          rating={anime.rating}
          tiempo={anime.duracion}
          carrito={carrito}
          setCarrito={setCarrito}
        />
      }
    )
  ]
}


function Proyecto() {
  return <>
    <section className="text-amber-100 grid grid-cols-1 md:grid-cols-3 container mx-auto gap-4">
      <ListaAnime />
    </section>
    <BotonIncrementar />
  </>

}

export default Proyecto;