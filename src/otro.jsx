import axios from 'axios'
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'


const URL = "https://dragonball-api.com/api/characters"

function PeticionesFetch({ url }) {

    const [saludo, setSaludo] = useState("")
    useEffect(
        () => {
            fetch(URL).then(
                peticion => peticion.json()
                /*  function (peticion) {
                     console.log("¿Petición?", peticion);
                     return peticion.json()
                 } */
            ).then(
                cuerpo2 => {
                    console.log("cuerpo 2:", cuerpo2);
                }
            ).catch(
                function (error) {
                    console.error("Creo que tengo un error", error);
                }
            ).finally(
                function () {
                    console.log("Prueba");
                    setSaludo("He finalizado")

                }
            )
            console.log("¿Qué tiene test?");
        }, [])

    return (
        <>Hola {saludo}</>
    )

}

function PeticionesFetchAsync({ url }) {

    const [personaje, setPersonaje] = useState("PersonajeX")

    useEffect(function () {
        async function obtenerDatos() {
            try {
                const consulta = await fetch(url)
                const respuesta = await consulta.json()
                setPersonaje(respuesta.items[1].name)
            } catch (error) {
                setPersonaje(error.message)
            }
        }

        obtenerDatos()
    }, [])

    return (
        <>
            {personaje}
        </>
    )

}

const PeticionesAxios = ({ url }) => {

    const [personaje, setPersonaje] = useState("X")
    useEffect(
        () => {
            axios.get(url).then(
                datos => {
                    const { data: {
                        items
                    } } = datos

                    console.log("Esto viene de datos", datos);
                    setPersonaje(items[5].name)
                }
            ).catch(
                error => {
                    setPersonaje(error.message)
                    console.log(error.message)
                }
            ).finally(
                console.log("Esto si o si se ejecuta")

            )
        }, [])


    return (
        <>El personajes es: {personaje}</>
    )
}

const PeticionesAxiosTry = ({ url }) => {

    useEffect(() => {
        async function solicitarConAxios() {
            try {
                const peticion = await axios.get(url)
                console.log("Veamos los resultados", peticion.data);
                
            } catch (error) {
                console.log(error.message);
                
            }
        }

        solicitarConAxios()
    }, [])

    return (<>
    </>)
}

createRoot(document.getElementById('root')).render(
    <PeticionesAxiosTry url={URL} />
)
