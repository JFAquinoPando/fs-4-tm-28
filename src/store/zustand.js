import { create } from 'zustand'

export const useStorePropio = create((set) => ({
    carritox: [],
    agregarCarrito: (anime) => set((estado) => {
        // Evitar duplicados: solo agregar si no existes
        const existe = estado.carritox.some(item => item.id === anime.id)
        return {
            carritox: existe ? estado.carritox : [...estado.carritox, anime]
        }
    }),
    quitarCarrito: (animeId) => set((estado) => ({
        carritox: estado.carritox.filter((anime) => anime.id !== animeId)
    })),
    limpiarCarrito: () => set(() => ({
        carritox: []
    }))
}))

export const usePaginaTotal = create(
    function (set) {
        return ({
            totalPaginas: 1,
            paginaActual: 1,
            cambiarPagina: function (nuevaPagina) {
                return set(function (estado) {
                    return {paginaActual: nuevaPagina}
                })
            },
            cambiarTotalPaginas: function (nuevoTotal) {
                return set(function (estado) {
                    return {totalPaginas: nuevoTotal}
                })
            }
        })
    }
)