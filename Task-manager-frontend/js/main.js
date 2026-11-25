import { actualizarVista, cargarTareas} from "./ui.js";
import { initEvents } from "./events.js";
import {getUser} from "./api.js";
import {dateHandler} from "./utils.js";

export const initApp = async (DOM) => {
  const token = localStorage.getItem("token");

  if (token) {
    DOM.authModal.classList.add("hidden");
    DOM.appContent.classList.remove("blurred");  
    const userData = await getUser(token);
    DOM.tittleHeader.textContent = `${userData.user.user_metadata?.display_name.toUpperCase()}`;
    DOM.textTaskHeader.textContent = `Tareas de ${userData.user.user_metadata?.display_name}`;
    DOM.letterLogo.textContent = userData.user.user_metadata?.display_name.charAt(0).toUpperCase();
    dateHandler(DOM); // Llama a la función dateHandler para establecer la fecha mínima
    await cargarTareas(DOM);
  } else {
    DOM.authModal.classList.remove("hidden");
  }

  initEvents(DOM);
};
