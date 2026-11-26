import {
  actualizarVista,
  getEditingId,
  setEditingId,
  cargarTareas,
  setcurrentFilter,
} from "./ui.js";
import * as api from "./api.js";
import { mostrarError, mostrarExito } from "./notificaciones.js";
import { dateHandler } from "./utils.js";

function resetBtnFilters(DOM) {
  DOM.buttonAll.classList.remove("active");
  DOM.buttonPending.classList.remove("active");
  DOM.buttonCompleted.classList.remove("active");
}

function resetTaskForm(DOM) {
  DOM.inputTarea.value = "";
  DOM.inputDate.value = "";
  DOM.noDateCheckbox.checked = true;
  setEditingId(undefined);
  DOM.buttonAgregar.textContent = "Agregar";
}

export function initEvents(DOM) {
  dateHandler(DOM);
  DOM.buttonAll.classList.add("active");

  DOM.authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = DOM.authForm.querySelector('button[type="submit"]');
    const email = DOM.loginEmail.value;
    const password = DOM.loginPassword.value;

    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await api.loginUser(email, password);

      if (res?.ok) {
        mostrarExito(res.message || "Sesión iniciada");
        setTimeout(async () => {
          DOM.loginContainer.classList.add("hidden");
          DOM.loginPassword.type = "password";
          DOM.checkPassLogin.checked = false;
          DOM.authModal.classList.add("hidden");
          DOM.appContent.classList.remove("blurred");

          const userName = res.user?.name || "Usuario";
          DOM.titleHeader.textContent = userName.toUpperCase();
          DOM.textTaskHeader.textContent = `Tareas de ${userName}`;
          DOM.letterLogo.textContent = userName.charAt(0).toUpperCase();

          await cargarTareas(DOM);
          if (submitBtn) submitBtn.disabled = false;
        }, 3000);
      } else {
        mostrarError(res?.error || res?.message || "Error desconocido al iniciar sesión");
        if (submitBtn) submitBtn.disabled = false;
      }
    } catch (error) {
      mostrarError(error.message || "Error al iniciar sesión");
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  DOM.btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    DOM.titleHeader.textContent = "Task Manager";
    DOM.textTaskHeader.textContent = "";
    DOM.letterLogo.textContent = "";
    DOM.lista.innerHTML = "";
    resetTaskForm(DOM);
    setcurrentFilter("all");
    resetBtnFilters(DOM);
    DOM.buttonAll.classList.add("active");
    DOM.authForm.reset();

    DOM.loginContainer.classList.remove("hidden");
    DOM.registerContainer.classList.add("hidden");
    DOM.authModal.classList.remove("hidden");
    DOM.appContent.classList.add("blurred");
  });

  DOM.checkPassLogin.addEventListener("change", () => {
    DOM.loginPassword.type = DOM.checkPassLogin.checked ? "text" : "password";
  });

  DOM.checkPassRegister.addEventListener("change", () => {
    DOM.regPassword.type = DOM.checkPassRegister.checked ? "text" : "password";
  });

  DOM.registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = DOM.registerForm.querySelector('button[type="submit"]');
    const usuario = {
      name: DOM.regName.value,
      email: DOM.regEmail.value,
      password: DOM.regPassword.value,
    };

    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await api.registrarUsuario(usuario);

      if (res?.ok) {
        mostrarExito(res.message || "Registro completado");
        setTimeout(() => {
          DOM.registerContainer.classList.add("hidden");
          DOM.loginContainer.classList.remove("hidden");
          DOM.registerForm.reset();
          if (submitBtn) submitBtn.disabled = false;
        }, 3000);
      } else {
        mostrarError(res?.error || "Error desconocido al registrar el usuario");
        if (submitBtn) submitBtn.disabled = false;
      }
    } catch (error) {
      mostrarError(error.message || "Error al registrar el usuario");
      if (submitBtn) submitBtn.disabled = false;
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
    const texto = DOM.inputTarea.value.trim();
    if (!texto) return;

    const fechaVencimiento = DOM.noDateCheckbox.checked
      ? null
      : DOM.inputDate.value || null;

    DOM.buttonAgregar.disabled = true;

    try {
      if (DOM.buttonAgregar.textContent === "Agregar") {
        await api.createTask(texto, fechaVencimiento);
        await cargarTareas(DOM);
        resetTaskForm(DOM);
        mostrarExito("Tarea agregada");
      } else {
        const editingId = getEditingId();
        await api.updateTask(editingId, {
          texto,
          fechaVencimiento,
        });
        await cargarTareas(DOM);
        resetTaskForm(DOM);
        mostrarExito("Tarea actualizada");
      }
    } catch (error) {
      mostrarError(error.message || "Error al guardar la tarea");
    } finally {
      DOM.buttonAgregar.disabled = false;
    }
  });

  DOM.buttonAll.addEventListener("click", () => {
    resetBtnFilters(DOM);
    DOM.buttonAll.classList.add("active");
    setcurrentFilter("all");
    actualizarVista(DOM);
  });

  DOM.buttonPending.addEventListener("click", () => {
    resetBtnFilters(DOM);
    DOM.buttonPending.classList.add("active");
    setcurrentFilter("pending");
    actualizarVista(DOM);
  });

  DOM.buttonCompleted.addEventListener("click", () => {
    resetBtnFilters(DOM);
    DOM.buttonCompleted.classList.add("active");
    setcurrentFilter("completed");
    actualizarVista(DOM);
  });
}