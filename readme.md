# Task Manager API

## 📌 Descripción
API REST para gestionar tareas de usuarios.
Permite crear, editar, completar y eliminar tareas con persistencia en base de datos y autenticación.

## 🧠 Qué ofrece
- CRUD de tareas
- Filtros por estado
- Autenticación de usuarios
- Persistencia en PostgreSQL
- Arquitectura con middlewares

## 🛠️ Tecnologías
- Node.js
- Nodemon (Desarrollo)
- Express
- PostgreSQL (Supabase)
- JWT
- Middleware de autenticación

## 🔐 Autenticación
La API utiliza JWT para proteger las rutas privadas.

## 📦 Endpoints
| Método | Ruta | Descripción |
|------|------|-----------|
| GET | /tasks | Listar tareas |
| POST | /tasks/post | Crear tarea |
| PUT | /tasks/:id | Actualizar |
| DELETE | /tasks/id/:id | Eliminar |
| POST | /auth/login | Login |

## 🗄️ Base de datos
PostgreSQL en Supabase

Tabla principal: `tasks`

## ▶️ Cómo ejecutar
npm install  
npm run dev

## VERCEL DEPLOY
https://task-manager-backend-zeta-five.vercel.app/

