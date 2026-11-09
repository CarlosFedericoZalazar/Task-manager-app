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
    error: document.getElementById("message-error")
};

const authForm = document.querySelector('#auth-form');
const authModal = document.querySelector('#auth-modal');
const appContent = document.querySelector('#app-content');
const togglePasswordBtn = document.querySelector('#togglePassword');
const inputPassword = document.querySelector('#inputPassword');

authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Aquí validarías tu correo y contraseña (o tu lógica de autenticación)

    // 1. Ocultamos el modal
    authModal.style.display = 'none';

    // 2. Quitamos el desenfoque y habilitamos clics en la app
    appContent.classList.remove('blurred');
});

togglePasswordBtn.addEventListener('click', () => {
    // Si es tipo password, lo cambiamos a text; si no, a password
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);

    // Cambiamos el ícono según corresponda (👁️ para ver, 🙈 para ocultar)
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
});

cargarTareas(DOM);
initEvents(DOM);







