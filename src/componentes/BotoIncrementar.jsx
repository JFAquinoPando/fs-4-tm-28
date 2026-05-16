import { useState, useEffect } from "react"

export function BotonIncrementar() {
  /* let valor = 0 */
  const [valor, setValor] = useState(0)

  useEffect(() => {
    const titulo = document.querySelector("title")
    titulo.textContent = `Hola, el valor es ${valor}`
  }, [valor])

  const incrementarAhora = () => {
    setValor((valor) => {
      return valor + 1
    })

  }


  return <div className="flex flex-col gap-3 justify-center">
    <span className="text-3xl text-center">Haz hecho click {valor} veces</span>
    <button
      onClick={incrementarAhora}
      className="px-6 py-4 border rounded-2xl bg-green-700 hover:bg-amber-800">
      Incrementar
    </button>
  </div>
}