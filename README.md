# React + TypeScript

Este proyecto es una aplicación construida con React y TypeScript, empaquetada con Webpack. Está diseñada para proporcionar una experiencia de usuario fluida y eficiente al interactuar con datos de podcast, utilizando algunas de las bibliotecas más populares y poderosas en el ecosistema de React.

## http://josegabrielm9.sg-host.com/ (demo)

## Tecnologías usadas

- **React 18**
- **TypeScript** 
- **ContextAPI** 
- **Webpack**: Maneja dos entornos "development" y "production" donde se sirven los assets concatenados y minimizados.
- **React Query**: Utilizado para buscar, sincronizar y almacenar en caché datos del servidor, facilitando la gestión del estado de los datos de la aplicación.
- **React Router DOM**: Utilizado para manejar el enrutamiento en nuestra aplicación de una sola página (SPA), permitiendo navegaciones entre vistas sin recargar la página.
- **useParams (React Router DOM)**: Permite acceder a los parámetros de la URL y crear rutas dinámicas basadas en los identificadores de los podcasts o episodios.
- **Date-fns**: Una biblioteca de manejo de fechas en JavaScript para formatearlas y manipularlas.

## Características

- Navegación fluida y dinámica entre páginas sin recargar el sitio web.
- Consulta y gestión de datos de podcasts con React Query, optimizando las peticiones al servidor y el almacenamiento en caché de los datos.
- Formateo y manipulación de fechas con date-fns para presentar las fechas de publicación de los podcasts de forma legible.
- Tipado estático y mejoras en el desarrollo gracias a TypeScript.

## Arquitectura aplicada  

Apliqué -Clean Architecture- para mejorar la escalabilidad y mantenibilidad del proyecto, logrando un código desacoplado que facilita las pruebas y actualizaciones de componentes. Esta arquitectura promueve la modularidad, separando la lógica del dominio. Adoptar Clean Architecture subraya mi enfoque en un desarrollo que permita preparar el proyecto para crecer y evolucionar fácilmente.

## Instrucciones de Instalación

1. Clone el repositorio:

git clone git@github.com:angrygabo/Podcasts-React-Typescript-Webpack-ReactQuery.git

2. Instalación de dependencias, inicializar el servidor o compilar:

npm install / npm start / npm run build

## Tests & ESLint

npm run test / npm run lint