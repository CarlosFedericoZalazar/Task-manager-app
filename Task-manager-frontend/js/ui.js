import { renderizar } from "./view.js";
import {getTasks, toggleTask, deleteTask} from "./api.js";

let tareas;

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
    tareas = res.data;

    if (DOM.textPending) {
        writeTextPending(DOM.textPending);
    }
    actualizarVista(DOM);
};

export const actualizarVista = (DOM) => {
    console.log("ACTUALIZAR");
    let tareasVisibles = tareas;

    if (currentFilter === "pending") {
        tareasVisibles = tareas.filter(t => !t.completada);
    }
    if (currentFilter === "completed") {
        tareasVisibles = tareas.filter(t => t.completada);
    }

    renderizar(DOM.lista, tareasVisibles, {
        onToggle: async (tarea) => {
            await toggleTask(tarea.id, !tarea.completada);
            await refresh(DOM);
        },   
        onDelete: async (tarea) => {
            await deleteTask(tarea.id);
            await refresh(DOM);
        },
        onUpdate: (tarea) => {
            editingId = tarea.id;
            DOM.inputTareas.value = tarea.texto;
            DOM.buttonAgregar.textContent = "Modificar";
        }
    });
};

export const writeTextPending = (textPending)=>{
    let incompletas = tareas.filter(t => !t.completada).length;
    let total = tareas.length;    
    textPending.textContent = `Pendientes ${incompletas}/${total}`;
};

export const refresh = async (DOM)=>{
    await cargarTareas(DOM);
}