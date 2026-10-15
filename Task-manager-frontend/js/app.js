import {cargarTareas, actualizarVista, refresh} from "./ui.js"
import {initEvents} from "./events.js"

import {createTask} from "./api.js";

const DOM ={
    buttonAll: document.getElementById("buttonAll"),
    buttonPending:document.getElementById("buttonPending"),
    buttonCompleted:document.getElementById("buttonCompleted"),    
    textPending: document.getElementById("text-pending"),    
    buttonAgregar: document.getElementById("btnAgregar"),
    inputTareas: document.getElementById("inputTarea"),
    lista: document.getElementById("lista")
};

cargarTareas(DOM);
initEvents(DOM);







