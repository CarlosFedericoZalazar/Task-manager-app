# Task Manager API

## 📌 Descripción
API REST para gestionar tareas de usuarios.
Permite crear, editar, completar y eliminar tareas con persistencia en base de datos y autenticación.

## Estructura del proyecto
- controllers/
- db
- middlewares/
- routes/
- services/

## 🧠 Qué ofrece
- CRUD de tareas
- Filtros por estado
- Persistencia en PostgreSQL
- Arquitectura con middlewares

## 🛠️ Tecnologías
- Node.js
- Nodemon (Desarrollo)
- Express
- PostgreSQL (Supabase)


## 📦 Endpoints
| Método | Ruta | Descripción |
|--------|-------------------|----------------|
| GET    | /tasks            | Listar tareas  |
| POST   | /tasks            | Crear tarea    |
| PUT    | /tasks/:id        | Actualizar     |
| DELETE | /tasks/:id        | Eliminar       |
| PUT    | /tasks/:id/toggle | Alternar estado|

## 🗄️ Base de datos
PostgreSQL en Supabase

Tabla principal: `tasks`

## ▶️ Cómo ejecutar
npm install  
npm run dev

## VERCEL DEPLOY
👉 https://task-manager-app-back-alpha.vercel.app
