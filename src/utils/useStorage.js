export const useStorage = (clave, accion,valor=null) => {
    if (accion == "guardar") {
        localStorage.setItem(clave, valor)
    }
    if (accion == "obtener") {
        return localStorage.getItem(clave)
    }
}