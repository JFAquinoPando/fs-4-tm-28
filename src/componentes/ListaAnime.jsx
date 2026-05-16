import { Imagen } from "./Imagen.jsx";
import { Tarjeta } from "./Tarjeta.jsx";

export function ListaAnime({ listado }) {
    return listado.map(
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