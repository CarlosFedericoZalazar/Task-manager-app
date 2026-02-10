# 📝 Task Manager – Frontend
## Descripción
Este proyecto es el frontend de una aplicación de gestión de tareas (Task Manager) desarrollada con **JavaScript**. El objetivo principal es practicar la arquitectura de aplicaciones, el manejo del estado y el consumo de APIs.

- Arquitectura limpia y modular
- Interfaz intuitiva y responsiva
- Manejo de tareas con funcionalidades completas (crear, editar, eliminar, marcar como completada)
- Arquitectura limpia

## Arquitectura
Este proyecto sigue una separación simple de responsabilidades:

- `app.js` – estado de la aplicación y coordinación  
- `task.js` – lógica de dominio de las tareas  
- `view.js` – renderizado de la interfaz y manejo del DOM 
- `api.js` – comunicación con el backend (REST API) 
- `utils.js` – persistencia (localStorage)

Clase Task: representa una tarea con propiedades como id, título, descripción, estado (completada o pendiente) y métodos para actualizar su estado.

- toggle() → marca o desmarca la tarea como completada

- update(texto) → actualiza el contenido de la tarea

La interfaz se construye a partir del estado.  
Todas las acciones del usuario se manejan mediante callbacks que se envían desde `app.js` hacia `view.js`.

## 📄 Descripción
Frontend de una aplicación de gestión de tareas (Task Manager) desarrollada con **JavaScript**, enfocada en practicar arquitectura, manejo de estado y consumo de APIs.

Este proyecto forma parte de mi entrenamiento para convertirme en **desarrollador Full-Stack**.

---

## 🚀 Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- LocalStorage (por ahora)
- Git & GitHub
- Vercel (deploy frontend)

---

## 📦 Funcionalidades actuales

* Crear tareas
* Listar tareas
* Editar tareas
* Marcar tareas como completadas
* Filtrar tareas (Todas / Pendientes / Completadas)
* Eliminar tareas
* Persistencia en LocalStorage
* UI responsiva y amigable
* Persistencia en base de datos (vía API)
* Demo online en Vercel

---

## 🧭 Próximas mejoras (roadmap)

- Conexión con backend (Node.js + Express)
- Autenticación de usuarios (JWT)
- Base de datos

---

## 📁 Estructura del proyecto

```bash
task-manager-frontend/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── api.js
│   ├── tasks.js
│   └── views.js
└── README.md

## 🌐 Demo en vivo

Podés probar la aplicación funcionando en el siguiente enlace:

👉 https://task-manager-app-omega-mauve.vercel.app/
