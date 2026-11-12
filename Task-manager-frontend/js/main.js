import { cargarTareas} from "./ui.js";
import { initEvents } from "./events.js";
import {getUser} from "./api.js";

export const initApp = async (DOM) => {
  const token = localStorage.getItem("token");

  if (token) {
    DOM.authModal.classList.add("hidden");
    DOM.appContent.classList.remove("blurred");

    const userData = await getUser(token);
    DOM.tittleHeader.textContent = `Hola ${userData.user.user_metadata?.display_name || userData.user.email} 👋!`;
  } else {
    DOM.authModal.classList.remove("hidden");
  }

  cargarTareas(DOM);
  initEvents(DOM);
};
