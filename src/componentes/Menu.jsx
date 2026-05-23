import { Link } from "react-router-dom"


export function Menu() {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <Link className="text-zinc-400 hover:text-white transition-colors font-medium" to="/">Inicio</Link>
            <Link className="text-zinc-400 hover:text-white transition-colors font-medium" to="/otro">Otro</Link>
        </nav>
    )
}