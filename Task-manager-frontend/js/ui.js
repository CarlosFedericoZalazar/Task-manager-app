import { renderizar } from "./view.js";
import { getTasks, toggleTask, deleteTask } from "./api.js";
import { mostrarError, mostrarExito } from "./notificaciones.js";

let tareas = [];
let editingId = undefined;
let currentFilter = "all";

export const setcurrentFilter = (filter) => {
  currentFilter = filter;
};

export const getEditingId = () => editingId;

export const setEditingId = (id) => {
  editingId = id;
};

export const cargarTareas = async (DOM) => {
  const res = await getTasks();
  tareas = Array.isArray(res?.data) ? res.data : [];

  if (DOM.textPending && DOM.textTotal) {
    writeTextPending(DOM);
  }
  actualizarVista(DOM);
};

export const actualizarVista = (DOM) => {
  let tareasVisibles = tareas;

  if (currentFilter === "pending") {
    tareasVisibles = tareas.filter((t) => !t.completada);
  }
  if (currentFilter === "completed") {
    tareasVisibles = tareas.filter((t) => t.completada);
  }

  renderizar(DOM.lista, tareasVisibles, {
    onToggle: async (tarea) => {
      try {
        await toggleTask(tarea.id, { completada: !tarea.completada });
        await refresh(DOM);
      } catch (error) {
        mostrarError(error.message || "Error al cambiar el estado de la tarea");
      }
    },
    onDelete: async (tarea) => {
      try {
        await deleteTask(tarea.id);
        await refresh(DOM);
        mostrarExito("Tarea eliminada");
      } catch (error) {
        mostrarError(error.message || "Error al eliminar la tarea");
      }
    },
    onUpdate: (tarea) => {
      editingId = tarea.id;
      DOM.inputTarea.value = tarea.texto;
      DOM.buttonAgregar.textContent = "Modificar";
    },
  });
};

export const writeTextPending = (DOM) => {
  const incompletas = tareas.filter((t) => !t.completada).length;
  const total = tareas.length;
  DOM.textPending.textContent = `Pendientes: ${incompletas}`;
  DOM.textTotal.textContent = `Total: ${total}`;
};

export const refresh = async (DOM) => {
  await cargarTareas(DOM);
};