export function Imagen({ fuente, titulo, estado }) {
  return <img src={fuente} alt={titulo} title={titulo}
    className={`w-full transition hover:scale-110 object-cover h-80 
    ${estado === true ? "hue-rotate-180 invert-20" : ""}`} />
}