import {cargarTareas, actualizarVista, refresh} from "./ui.js"
import {initEvents} from "./events.js"

const DOM ={
    buttonAll: document.getElementById("buttonAll"),
    buttonPending:document.getElementById("buttonPending"),
    buttonCompleted:document.getElementById("buttonCompleted"),    
    textPending: document.getElementById("text-pending"),    
    buttonAgregar: document.getElementById("btnAgregar"),
    inputTareas: document.getElementById("inputTarea"),
    lista: document.getElementById("lista"),
    error: document.getElementById("message-error"),
    authForm: document.querySelector('#auth-form'),
    authModal: document.querySelector('#auth-modal'),
    appContent: document.querySelector('#app-content')
};


cargarTareas(DOM);
initEvents(DOM);







