import { Imagen } from "./Imagen.jsx";
import { Tarjeta } from "./Tarjeta.jsx";

export function ListaAnime({ listado }) {
    console.log("Desde la lista de animes:", listado);
    
    return listado.map(
        function (anime, indice) {
            return <Tarjeta
                key={indice}
                id={anime.id}
                titulo={anime.nombre}
                imagen={anime.imagen}
                rating={anime.rating}
                tiempo={anime.duracion}
            />
        }
    )
}