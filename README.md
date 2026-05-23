# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

## Rediseño estilo IMDb

¡Listo! He transformado la aplicación para que tenga ese look profesional de IMDb que buscabas. 

Esto es lo que he cambiado:

1. **App.jsx**:
    * Implementé un header oscuro (zinc-900) con un logo personalizado ("ANIME DB" en caja amarilla).
    * La navegación ahora es discreta y moderna.
    * El fondo general es negro puro, resaltando las tarjetas.
    * La cuadrícula (grid) ahora es más dinámica, mostrando más pósters en pantallas grandes.

2. **BuscarAnime.jsx**:
    * Eliminé el fondo ámbar gigante y lo convertí en una barra de búsqueda elegante con icono de lupa, integrada directamente en el header.

3. **Tarjeta.jsx**:
    * Ahora parecen pósters de cine reales.
    * Agregué el rating con la estrella amarilla clásica de IMDb.
    * Cambié el botón de "Agregar" por uno de "+ Watchlist" con un diseño mucho más limpio y profesional.
    * Reduje los tamaños de fuente exagerados para que todo se vea proporcionado.

4. **Imagen.jsx**:
    * Ajusté las proporciones y agregué un efecto de zoom suave al pasar el mouse por encima.

5. **Anime.jsx (Página de Detalle)**:
    * Implementé un diseño cinematográfico completo con un header para el título y la puntuación.
    * Sección de sinopsis destacada con bordes amarillos temáticos.
    * Cuadrícula de metadatos técnicos (episodios, emisión, audiencia) con tipografía optimizada.
    * Botón de acción "Watchlist" integrado.
