import {
  actualizarVista,
  getEditingId,
  setEditingId,
  cargarTareas,
  setcurrentFilter,
} from "./ui.js";
import * as api from "./api.js";
import { mostrarError, mostrarExito } from "./notificaciones.js";
import {dateHandler} from "./utils.js";

export function initEvents(DOM) {

  dateHandler(DOM);

  DOM.authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = DOM.loginEmail.value;
    const password = DOM.loginPassword.value;

    const res = await api.loginUser(email, password);

    console.log("Respuesta del login:", res);
    
    if (res.ok) {
      mostrarExito(res.message);
      setTimeout(async () => {
        DOM.loginContainer.classList.add("hidden");
        DOM.loginPassword.type = "password";
        DOM.authModal.style.display = "none";
        DOM.appContent.classList.remove("blurred");
        DOM.tittleHeader.textContent = `${res.user.name.toUpperCase()}`;
        DOM.textTaskHeader.textContent = `Tareas de ${res.user.name}`;
        DOM.letterLogo.textContent = res.user.name.charAt(0).toUpperCase();
        await cargarTareas(DOM);
      }, 3000);
    } else {
      mostrarError(res.error || "Error desconocido al iniciar sesión");
    }
  });

  DOM.btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    DOM.tittleHeader.textContent = "Task Manager";
    DOM.textTaskHeader.textContent = "";
    DOM.lista.innerHTML = "";
    setEditingId(undefined);
    setcurrentFilter("all");
    DOM.authForm.reset();

    DOM.loginContainer.classList.remove("hidden");
    DOM.registerContainer.classList.add("hidden");
    DOM.authModal.style.display = "flex";
    DOM.authModal.classList.remove("hidden");
    DOM.appContent.classList.add("blurred");
  });

  DOM.checkLoginPassword.addEventListener("change", ()=>{
    console.log("check pass")
    DOM.loginPassword.type = DOM.loginPassword.type == "password" ? "text" : "password";
  })

  DOM.checkLoginRegister.addEventListener("change", ()=>{
    console.log("check pass")
    DOM.regPassword.type = DOM.regPassword.type == "password" ? "text" : "password";
  })

  DOM.registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const usuario = {
      name: DOM.regName.value,
      email: DOM.regEmail.value,
      password: DOM.regPassword.value,
    };

    const res = await api.registrarUsuario(usuario);
    
    if (res.ok) {
      mostrarExito(res.message); 

      setTimeout(() => {
          DOM.registerContainer.classList.add("hidden");
          DOM.loginContainer.classList.remove("hidden");
      }, 3000);
    } else {
      console.error("MENSAJE! Error al registrar el usuario:", res.error);
      mostrarError(res.error || "Error desconocido al registrar el usuario");
    }
  });

  DOM.linkToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    DOM.loginContainer.classList.add("hidden");
    DOM.registerContainer.classList.remove("hidden");
  });

  DOM.linkToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    DOM.registerContainer.classList.add("hidden");
    DOM.loginContainer.classList.remove("hidden");
  });

  DOM.buttonAgregar.addEventListener("click", async () => {
    // logica agregar y actualizar
    if (DOM.buttonAgregar.textContent === "Agregar") {
      if (DOM.inputTareas.value.trim() !== "") {
        console.log(`mandamos ${DOM.inputTareas.value} y  ${DOM.inputDate.value}`);
        // Directo al grano: solo texto y fecha. El token viaja solo en api.js
        const res = await api.createTask(DOM.inputTareas.value, DOM.inputDate.value);
        console.log(res);

        cargarTareas(DOM);
        DOM.inputTareas.value = "";
        DOM.inputDate.value = "";
        DOM.noDateCheckbox.checked = true;
      }
    } else {
      const editingId = getEditingId();
      await api.updateTask(editingId, {
        texto: DOM.inputTareas.value,
      });

      cargarTareas(DOM);
      DOM.inputTareas.value = "";
      setEditingId(undefined);
      DOM.buttonAgregar.textContent = "Agregar";
    }
  });

  DOM.buttonAll.addEventListener("click", () => {
    resetBtnFilters(DOM);
    setcurrentFilter("all");
    actualizarVista(DOM);
  });

  DOM.buttonPending.addEventListener("click", () => {
    resetBtnFilters(DOM);
    setcurrentFilter("pending");
    DOM.buttonPending.classList.add("active");
    actualizarVista(DOM);
  });

  DOM.buttonCompleted.addEventListener("click", () => {
    resetBtnFilters(DOM);
    setcurrentFilter("completed");
    DOM.buttonCompleted.classList.add("active");
    actualizarVista(DOM);
  });
}

function resetBtnFilters(DOM) {
  DOM.buttonAll.classList.remove("active");
  DOM.buttonPending.classList.remove("active");
  DOM.buttonCompleted.classList.remove("active");
}
