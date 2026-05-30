import { ListaAnime } from "./ListaAnime.jsx"

export const ResultadosAnime = ({lista, setCarrito}) => {
    return (<>
        <header className="mb-8 border-l-4 border-yellow-400 pl-4">
            <h1 className="text-3xl font-bold">Resultados populares</h1>
            <p className="text-zinc-500 text-sm">Explora los mejores animes del momento</p>
        </header>

        <section
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <ListaAnime listado={lista} setCarrito={setCarrito} />
        </section>
    </>)
}
