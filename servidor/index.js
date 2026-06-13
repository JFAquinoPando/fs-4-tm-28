import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { Readable } from 'node:stream';


// Parser simple para multipart/form-data
function parseMultipartFormData(contentType, body) {
    const boundary = contentType.split('boundary=')[1];
    const parts = body.split(`--${boundary}`);
    const datos = {};

    parts.forEach(part => {
        if (part.includes('Content-Disposition')) {
            const nombreMatch = part.match(/name="([^"]+)"/);
            const nombreCampo = nombreMatch ? nombreMatch[1] : null;
            
            if (nombreCampo) {
                // Extraer el valor después del double CRLF
                const valor = part.split('\r\n\r\n')[1]?.split('\r\n')[0] || '';
                datos[nombreCampo] = valor;
            }
        }
    });

    return datos;
}


const server = createServer(async (peticion, respuesta) => {
    
    respuesta.setHeader("Access-Control-Allow-Origin", "*")
    respuesta.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS')
    respuesta.setHeader("Access-Control-Allow-Headers", 'Content-Type')


    if (peticion.method === "POST" && peticion.url === "/usuarios") {

        let cuerpo = ''
        peticion.on("data", (trozos) => {
            cuerpo += trozos.toString()
        })

        peticion.on("end", async () => {
            console.log("Cuerpo?", cuerpo);
            
            // Parsear los datos multipart
            const contentType = peticion.headers['content-type'];
            const datosRecibidos = parseMultipartFormData(contentType, cuerpo);
            console.log("datos Recibidos", datosRecibidos);

            const correo = datosRecibidos.correo;
            const clave = datosRecibidos['clave-secreta'];

            const datos = await readFile('usuarios.json', {
                encoding: "utf8"
            })

            console.log("URL:", peticion.url, "metodo:", peticion.method)

            const datosJSON = JSON.parse(datos)
            const encontrarUsuario = datosJSON.filter(
                usuario => usuario.correo === correo && usuario.clave === clave
            )
            
            if (encontrarUsuario.length) {
                respuesta.writeHead(200, { 'Content-Type': 'application/json' })
                respuesta.end(JSON.stringify({
                    respuesta: "ok",
                    datos: encontrarUsuario[0].correo
                }))
                return
            }

            respuesta.writeHead(401, { 'Content-Type': 'application/json' })
            respuesta.end(JSON.stringify({
                respuesta: "error",
                datos: "usuario no registrado"
            }))
        })
    }

    else if (peticion.method === "GET" && peticion.url=== "/") {
        respuesta.end("Bievenido")
    }

    else{
        respuesta.end("Ruta no encontrada")
    }

});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Escuchando en 127.0.0.1:3000');
});
