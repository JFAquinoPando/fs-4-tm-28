import imagen from "./../../public/placeholder.webp";

export function Imagen({ fuente, titulo, estado }) {
  return <img src={fuente ?? ""} alt={titulo} title={titulo}
    className={`w-full transition-transform duration-500 group-hover:scale-110 object-cover h-full 
    ${estado === true ? "opacity-50" : ""}`} />
}