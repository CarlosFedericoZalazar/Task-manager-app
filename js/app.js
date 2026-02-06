import * as Tasks from "./task.js";
import { saveOnLocalStorage } from "./utils.js";
import { renderizar } from "./view.js";

const buttonAgregar = document.getElementById("btnAgregar");
const inputTareas = document.getElementById("inputTarea");
const lista = document.getElementById("lista");
let editingId = undefined;

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function actualizarVista() {
    renderizar(lista, tareas, {
        onToggle: (id) => {
            tareas = Tasks.toggleTarea(tareas, id);
            refresh();
        },
        onDelete: (id) => {
            tareas = Tasks.borrar(tareas, id);
            refresh();
        },
        onUpdate: (id, texto) => {
            editingId = id;
            inputTareas.value = texto;            
            buttonAgregar.textContent = "Modificar";
        }
    });
}

function refresh(){
    saveOnLocalStorage(tareas);
    actualizarVista();
}

actualizarVista();

buttonAgregar.addEventListener("click", () => {
    if(buttonAgregar.textContent === "Agregar"){        
        if (inputTareas.value.trim() !== "") {
            tareas = [...tareas, Tasks.addTarea(inputTareas.value)];
            refresh();
            inputTareas.value = "";
        }
    }
    else{
        tareas = Tasks.updateTask(tareas, editingId, inputTareas.value);
        inputTareas.value = "";
        editingId = undefined;
        refresh();
        buttonAgregar.textContent = "Agregar";
    }
});
