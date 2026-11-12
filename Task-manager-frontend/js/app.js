import {initApp} from "./main.js";

const DOM ={
    tittleHeader: document.getElementById("title-header"),
    registerForm: document.getElementById('register-form'),
    regName: document.getElementById('regName'),
    regEmail: document.getElementById('regEmail'),
    regPassword: document.getElementById('regPassword'),
    checkLoginRegister: document.getElementById('checkPassRegister'),
    loginEmail: document.getElementById('inputEmail'),
    loginPassword: document.getElementById('inputPassword'),
    checkLoginPassword: document.getElementById('checkPassLogin'),
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

initApp(DOM);







