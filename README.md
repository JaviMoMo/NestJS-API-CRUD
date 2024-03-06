
# NestJS - API Gibobs

Una API sencilla con un CRUD de tareas, dónde cada usuario podrá crear sus tareas, visualizarlas, completarlas o borrarlas. Se pueden registrar usuarios e iniciar sesión con ellos.

## Pre-requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (v20)
- npm (viene con Node.js)
- Git (para clonar el repositorio, si es necesario)

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/JaviMoMo/NestJS-API-CRUD.git
   cd NestJS-API-CRUD
   ```

2. **Instalar dependencias**

   Usando npm:

   ```bash
   npm install
   ```

## Ejecutando la aplicación

3. **Ambiente de producción**


   ```bash
   npm start
   ```

## Despliegue

Para desplegar con Docker:

   ```bash
   docker build -t mi-aplicacion-nestjs .
   ```

   ```bash
   docker run -p 3000:3000 mi-aplicacion-nestjs
   ```

## Base de datos

He utilizado MongoDB Atlas, para así tener una base de datos desplegada en la web y poder acceder desde cualquier dispositivo. 

