import { cargarTareas } from "./ui.js";
import { initEvents } from "./events.js";
import { getUser } from "./api.js";
import { mostrarError } from "./notificaciones.js";

const mostrarAuth = (DOM) => {
  DOM.authModal.classList.remove("hidden");
  DOM.appContent.classList.add("blurred");
};

export const initApp = async (DOM) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const userData = await getUser(token);
      const displayName = userData?.user?.user_metadata?.display_name || "Usuario";

      DOM.authModal.classList.add("hidden");
      DOM.appContent.classList.remove("blurred");
      DOM.titleHeader.textContent = displayName.toUpperCase();
      DOM.textTaskHeader.textContent = `Tareas de ${displayName}`;
      DOM.letterLogo.textContent = displayName.charAt(0).toUpperCase();

      await cargarTareas(DOM);
    } catch (error) {
      localStorage.removeItem("token");
      mostrarAuth(DOM);
      mostrarError("Sesión inválida o expirada. Inicia sesión nuevamente.");
    }
  } else {
    mostrarAuth(DOM);
  }

  initEvents(DOM);
};