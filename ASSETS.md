# Cómo agregar las imágenes del portafolio

El sitio ya está construido y funciona sin las imágenes (muestra el nombre del
cliente o del proyecto como respaldo cuando falta un archivo). Para que se
vean los logotipos y las fotos de cada proyecto solo hay que colocar los
archivos en las carpetas correctas — el código ya apunta a esas rutas, no hay
que tocar nada más.

## Estructura esperada

```
portafolioAMC/
├── logos/                     ← logotipos de los 44 clientes + el tuyo
│   ├── bella.png
│   ├── empire-fitness.jpg
│   ├── ...
│   └── bnw-studio-logo.png    ← logo de Black and White Studio (footer)
├── profile/
│   └── andrea.jpg             ← tu foto de perfil (sección "Sobre mí")
└── projects/
    ├── bella/
    │   ├── logo-color.jpg
    │   ├── tarjetas.jpg
    │   └── ...
    ├── empire/
    │   └── ...
    └── ... (una carpeta por cliente)
```

Los nombres de archivo exactos que espera cada cliente están en
`js/data.js` (busca el campo `image` de cada cliente y de cada proyecto
dentro de su arreglo `projects`). Si subes un archivo con el nombre que
aparece ahí, aparecerá automáticamente — no hay que editar HTML/CSS/JS.

## Por qué no se subieron aquí

Dijiste que Claude Design no dejó subir las imágenes del portafolio porque
pesan mucho. Este repositorio de código no tiene ese límite de subida del
chat, así que puedes:

1. **Copiarlas directamente al repo** (más simple): arrastra las carpetas
   `logos/` y `projects/` que ya tenías organizadas desde Claude Design a la
   raíz del proyecto, reemplazando las carpetas vacías que dejé.
2. **Subirlas por Git** desde tu computadora: clona esta rama
   (`claude/portfolio-heavy-images-mgyuoa`), copia las imágenes en su lugar,
   y haz commit + push. Git no tiene el límite de tamaño que tiene el chat
   (GitHub solo bloquea archivos individuales de más de 100 MB, que es muy
   por encima de lo normal para fotos de proyectos).
3. Si quieres reducir el peso del sitio para que cargue rápido en la web,
   comprime las imágenes primero (por ejemplo con
   [squoosh.app](https://squoosh.app) o exportando JPG a calidad 75-85% en
   vez de PNG cuando no necesites transparencia). No es obligatorio, pero
   ayuda mucho al tiempo de carga con 40+ clientes y varios proyectos cada
   uno.

## Notas

- Los logotipos se muestran en escala de grises (`filter: grayscale(1)`)
  automáticamente sin importar si el archivo original es a color.
- Cada cliente en `js/data.js` tiene un arreglo `projects` — el orden en ese
  arreglo es el orden en que aparecen en el carrusel del modal.
- El logo del footer (`logos/bnw-studio-logo.png`) y la foto de perfil
  (`profile/andrea.jpg`) tienen las mismas rutas fijas siempre.
