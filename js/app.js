import {Task} from "./task.js";
import { saveOnLocalStorage } from "./utils.js";
import { renderizar } from "./view.js";
import * as api from "./api.js";

const buttonAll = document.getElementById("buttonAll");
const buttonPending =document.getElementById("buttonPending");
const buttonCompleted =document.getElementById("buttonCompleted");

const textPending = document.getElementById("text-pending");

const buttonAgregar = document.getElementById("btnAgregar");
const inputTareas = document.getElementById("inputTarea");
const lista = document.getElementById("lista");

let editingId = undefined;
let currentFilter = "all"; 

let tareas;
// let datosCrudos = JSON.parse(localStorage.getItem("tareas")) || [];

// console.log(datosCrudos);
// let tareas = datosCrudos.map(t => new Task(t.texto, t.completada, t.id));

async function cargarTareas() {
    const res = await api.getTasks();
    tareas = res.data;
    actualizarVista();
}

cargarTareas();

function actualizarVista() {
    let tareasVisibles = tareas;

    if (currentFilter === "pending") {
        tareasVisibles = tareas.filter(t => !t.completada);
    }

    if (currentFilter === "completed") {
        tareasVisibles = tareas.filter(t => t.completada);
    }
    writeTextPending();
    renderizar(lista, tareasVisibles, {
        onToggle: async (tarea) => {
            await api.toggleTask(tarea.id, !tarea.completada);
            await refresh();
        },   
        onDelete: async (tarea) => {
            await api.deleteTask(tarea.id);
            await refresh();
        },
        onUpdate: (tarea) => {
            editingId = tarea.id;
            inputTareas.value = tarea.texto;
            buttonAgregar.textContent = "Modificar";
        }
    });
}

function writeTextPending(){
    let incompletas = tareas.filter(t => !t.completada).length;
    let total = tareas.length;    
    textPending.textContent = `Pendientes ${incompletas}/${total}`;
}


async function refresh(){
    await cargarTareas();
}

buttonAgregar.addEventListener("click", async () => {
    if (buttonAgregar.textContent === "Agregar") {        
        if (inputTareas.value.trim() !== "") {
            await api.createTask(inputTareas.value);
            await refresh();
            inputTareas.value = "";
        }
    } 
    else {
        await api.updateTask(editingId, {
            texto: inputTareas.value
        });

        await refresh();
        inputTareas.value = "";
        editingId = undefined;
        buttonAgregar.textContent = "Agregar";
    }
});



buttonAll.addEventListener("click",()=>{
    resetBtnFilters();
    currentFilter = "all";
    actualizarVista();
})

buttonPending.addEventListener("click",()=>{
    resetBtnFilters();
    currentFilter = "pending";
    buttonPending.classList.add("active");
    actualizarVista();
})

buttonCompleted.addEventListener("click", ()=>{
    resetBtnFilters();
    currentFilter = "completed";
    buttonCompleted.classList.add("active");
    actualizarVista();
});

function resetBtnFilters() {
    buttonAll.classList.remove("active");
    buttonPending.classList.remove("active");
    buttonCompleted.classList.remove("active");
}
