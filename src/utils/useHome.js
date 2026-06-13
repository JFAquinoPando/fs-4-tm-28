import { useFetch } from "./useFetch.js";
import { useStorage } from "./useStorage";
import { usePaginaTotal } from "./../store/zustand.js";


export function useHome() {

    const { paginaActual, totalPaginas, cambiarPagina, cambiarTotalPaginas } = usePaginaTotal()
    let page = paginaActual || 1
    return useFetch(`https://api.jikan.moe/v4/anime?page=${paginaActual}`)
        .then(
            function (resultado) {
                console.log("REVISAR", resultado);

                const guardar = resultado?.data?.map(
                    (anime) => {
                        return {
                            nombre: anime.title,
                            imagen: anime.images.webp.image_url,
                            trailer: anime.trailer,
                            episodios: anime.episodes,
                            estado: anime.status,
                            al_aire: anime.aired,
                            duracion: anime.duration,
                            audiencia: anime.rating,
                            sinopsis: anime.synopsis,
                            puntuacion: anime.score
                        }
                    }
                )

                const todo = {
                    data: guardar,
                    paginacion: resultado.pagination
                }

                useStorage("animes", "guardar", JSON.stringify(todo))
                
                // Actualizar el store Zustand con los datos de paginación
                cambiarTotalPaginas(resultado.pagination.last_visible_page)
                cambiarPagina(resultado.pagination.current_page)
            }
        )
}