import {cargarTareas, actualizarVista, refresh} from "./ui.js"
import {initEvents} from "./events.js"

const DOM ={
    registerForm: document.getElementById('register-form'),
    regName: document.getElementById('regName'),
    regEmail: document.getElementById('regEmail'),
    regPassword: document.getElementById('regPassword'),
    loginEmail: document.getElementById('inputEmail'),
    loginPassword: document.getElementById('inputPassword'),
    buttonAll: document.getElementById("buttonAll"),
    buttonPending:document.getElementById("buttonPending"),
    buttonCompleted:document.getElementById("buttonCompleted"),    
    textPending: document.getElementById("text-pending"),    
    buttonAgregar: document.getElementById("btnAgregar"),
    inputTareas: document.getElementById("inputTarea"),
    lista: document.getElementById("lista"),
    error: document.getElementById("message-error"),
    authForm: document.getElementById('auth-form'),
    authModal: document.getElementById('auth-modal'),
    appContent: document.getElementById('app-content'),
    loginContainer : document.getElementById('login-container'),
    registerContainer : document.getElementById('register-container'),
    linkToRegister : document.getElementById('link-to-register'),
    linkToLogin : document.getElementById('link-to-login')
};


cargarTareas(DOM);
initEvents(DOM);







