# 📝 Task Manager – Frontend

## Arquitectura
Este proyecto sigue una separación simple de responsabilidades:

- `app.js` – estado de la aplicación y coordinación  
- `task.js` – lógica de dominio de las tareas  
- `view.js` – renderizado de la interfaz y manejo del DOM  
- `utils.js` – persistencia (localStorage)

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

---

## 📦 Funcionalidades actuales

- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Eliminar tareas
- Editar tareas existentes
- Persistencia en LocalStorage

---

## 🧭 Próximas mejoras (roadmap)

- Conexión con backend (Node.js + Express)
- Autenticación de usuarios (JWT)
- Base de datos
- Edición de tareas
- Filtros (completadas / pendientes)
- UI mejorada

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