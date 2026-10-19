# 📝 Task Manager App (Full-Stack)

Aplicación web Full-Stack para la gestión de tareas (*Task Manager*), desarrollada con **JavaScript vainilla** en el frontend y **Node.js con Express y PostgreSQL (Supabase)** en el backend. 

El proyecto implementa una arquitectura limpia y modular, persistencia en base de datos relacional y consumo de API REST.

---

## 🌐 Demo en Vivo

- **Frontend:** [https://task-manager-app-omega-mauve.vercel.app/](https://task-manager-app-omega-mauve.vercel.app/)
- **Backend API:** [https://task-manager-app-back-alpha.vercel.app](https://task-manager-app-back-alpha.vercel.app)

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5 & CSS3:** Estructura e interfaz responsiva.
- **JavaScript (ES6+):** Lógica de estado, manipulación del DOM y arquitectura modular.
- **Fetch API:** Consumo de endpoints REST del backend.
- **LocalStorage:** Persistencia local auxiliar.

### Backend
- **Node.js & Express:** Servidor HTTP y API RESTful.
- **PostgreSQL (Supabase):** Base de datos relacional.
- **Nodemon:** Herramienta de desarrollo para recarga automática.

### Herramientas & Despliegue
- **Git & GitHub:** Control de versiones (Monorepo).
- **Vercel:** Despliegue continuo de Frontend y Backend.

---

## 📦 Funcionalidades

- 🟢 **Crear tareas:** Registro rápido de nuevas tareas.
- 📋 **Listar y Filtrar:** Visualización global con filtros por estado (*Todas / Pendientes / Completadas*).
- ✏️ **Editar:** Actualización de título y contenido de tareas existentes.
- ☑️ **Alternar estado:** Marcar/desmarcar tareas como completadas.
- 🗑️ **Eliminar:** Borrado permanente de tareas.
- 🔄 **Persistencia completa:** Integración continua con PostgreSQL en la nube (Supabase).

---

## 📁 Estructura del Monorepo

```bash
Task-manager-app/
│
├── task-manager-frontend/    # Código del cliente (Frontend)
│   ├── index.html            # Interfaz principal
│   ├── css/                  # Estilos de la aplicación
│   └── js/                   # Lógica modular
│       ├── app.js            # Coordinación del estado y eventos principales
│       ├── api.js            # Módulo de integración con la API REST
│       ├── tasks.js          # Lógica de dominio y clase Task
│       ├── views.js          # Renderizado del DOM e interfaz
│        y utils.js          # Persistencia en localStorage
│
└── task-manager-backend/     # Servidor y API REST (Backend)
    ├── controllers/          # Controladores de las rutas
    ├── db/                   # Configuración de conexión a PostgreSQL
    ├── middlewares/          # Middlewares de validación y control de errores
    ├── routes/               # Definición de las rutas del API
    └── services/             # Lógica de negocio y consultas DB
```


## 📡 API REST - Endpoints

Base URL: `https://task-manager-app-back-alpha.vercel.app`

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/tasks` | Obtener todas las tareas |
| **POST** | `/tasks` | Crear una nueva tarea |
| **PUT** | `/tasks/:id` | Actualizar el contenido de una tarea |
| **PUT** | `/tasks/:id/toggle` | Alternar estado entre completada / pendiente |
| **DELETE** | `/tasks/:id` | Eliminar una tarea por ID |

---

## 🗄️ Base de Datos

El proyecto utiliza **PostgreSQL** alojado en **Supabase**.
* **Tabla principal:** `tasks`
* **Campos principales:** `id`, `texto`, `completada`,`created_at`.

---

## 💻 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU-USUARIO/Task-manager-app.git](https://github.com/TU-USUARIO/Task-manager-app.git)
cd Task-manager-app
```