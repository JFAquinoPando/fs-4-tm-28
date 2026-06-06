import axios from "axios";

export const useFetch = (url, metodo = "GET", configuracion = {}) => {
    const usar = import.meta.env.VITE_API_FETCH
    if (usar === "fetch") {
        return fetch(url, {
            method: metodo,
            ...configuracion
        }).then(
            (peticion) => {
                return peticion.json()
            }
        )
    } else {
        return axios[metodo.toLocaleLowerCase()](url, {
            ...configuracion
        }).then(
           function (respuesta) {
                console.log(respuesta.data);
                
                return respuesta.data
           }
        )
    }
}