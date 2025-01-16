# Proyecto: Chatbot para pedir Sushi

## Descripción General
Este proyecto consiste en un sistema completo diseñado para gestionar pedidos de sushi mediante un bot automatizado. Los usuarios pueden registrarse, iniciar sesión y realizar pedidos de manera sencilla. El sistema incluye autenticación de usuarios con roles diferenciados (administrador y usuario), protección de rutas mediante tokens JWT y almacenamiento temporal de credenciales en el navegador. Además, los administradores pueden gestionar los pedidos y los usuarios pueden visualizar el estado de sus órdenes.

El sistema está compuesto por dos partes principales:

1. **Backend:** Implementado con Node.js y Express, incluye la lógica de autenticación, generación de tokens JWT y verificación de roles.
2. **Frontend:** Una aplicación React que permite a los usuarios registrarse, iniciar sesión y acceder a diferentes vistas según su rol. 

## Frontend

### Tecnologías Utilizadas
- React
- React-Bootstrap
- React Router DOM
- Axios
- SweetAlert2

### Funcionalidades Principales
- Registro de usuarios.
- Inicio de sesión con almacenamiento de token en `sessionStorage`.
- Redirección según el rol del usuario.
- Verificación de token al acceder a rutas protegidas.
- Gestión de formularios con validaciones.
- Crear ordenes de compra con el bot
- El bot responde a varias preguntas frecuentes y si escribe en el bot la palabra "menu" descarga el mismo en formato PDF


### Preguntas frecuentes que el chatbot puede responder:

-- "¿Están abiertos?"
-- "¿A qué hora abren?"
-- "¿A qué hora cierran?"
-- "¿Qué opciones tienen para vegetarianos?"
-- "¿Hay promociones hoy?"
-- "¿Qué rolls recomiendas?"
-- "¿Cómo puedo hacer un pedido?"
-- "¿Cuánto tardan en entregar?"
-- "¿Cuál es el pedido mínimo?"
-- "¿Aceptan tarjetas de crédito?"
-- "¿Puedo pagar con transferencia?"
-- "¿Aceptan efectivo al momento de la entrega?"
-- "¿Hacen envíos a mi zona?"
-- "¿Cuánto cuesta el envío?"
-- "¿Cuáles son las zonas de cobertura?"
-- "¿Los rolls tienen pescado crudo?"
-- "¿Tienen opciones sin gluten?"
-- "¿Qué incluye el combo familiar?"
-- "¿Puedo cancelar mi pedido?"
-- "¿Dónde están ubicados?"
-- "¿Tienen servicio de catering para eventos?"

### Instalación
1. Navega al directorio del frontend:
   ```bash
   cd sushi_bot_front
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `clientAxios.js` con la URL base del backend:
   ```javascript
   import axios from 'axios';

   const clientAxios = axios.create({
     baseURL: 'http://localhost:3001',
   });

   export default clientAxios;
   ```
4. Inicia la aplicación:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

### Estructura de Carpetas
```
frontend/
|-- src/
|   |-- assets/
|   |-- css/
|   |-- components/
|   |-- helpers/
|   |-- img/
|   |-- routes/
|   |-- pages/
|   |-- App.js
|-- package.json
|-- .env
```

---

## API Endpoints

### Endpoints 
1. **Registro de usuario:**
   - `POST api/users/register`
   - Request body:
     ```json
     {
       "name": "string",
       "email": "string",
       "phone": "string",
       "address": "string",
       "password": "string"
     }
     ```

2. **Inicio de sesión:**
   - `POST api/users/login`
   - Request body:
     ```json
     {
       "email": "string",
       "password": "string"
     }

     ```
   - Response back:
     ```json
     {
       "token": "string",
       "rol": "string",
       "idUser": "string"
     }
     ```

## Consideraciones
- Asegúrate de iniciar el backend antes de ejecutar el frontend.
- Los tokens JWT no tienen un tiempo de expiración configurable desde el backend.
- Implemente algunos manejos de errores adecuado tanto en el frontend como en el backend para mejorar la experiencia del usuario.

---

## Mejoras Futuras
- Agregar la funcionalidad de recuperación de contraseña.
- Crear pruebas unitarias para el backend y el frontend.
- Habilitar autenticación mediante redes sociales (Google, Facebook, etc.).

---


## Autor
Andres Perlo
