import { actualizarVista, getEditingId, setEditingId, cargarTareas, setcurrentFilter } from "./ui.js";
import * as api from "./api.js";

export function initEvents(DOM) {
    // 1. Botón Agregar / Modificar
    DOM.buttonAgregar.addEventListener("click", async () => {
        // Acá manejás la lógica de agregar o actualizar
        if (DOM.buttonAgregar.textContent === "Agregar") {        
            if (DOM.inputTareas.value.trim() !== "") {
                await api.createTask(DOM.inputTareas.value);
                cargarTareas(DOM);
                DOM.inputTareas.value = "";
            }
        } else {
            const editingId = getEditingId();
            await api.updateTask(editingId, {
                texto: DOM.inputTareas.value
            });

            cargarTareas(DOM);
            DOM.inputTareas.value = "";
            setEditingId(undefined);
            DOM.buttonAgregar.textContent = "Agregar";
        }
    });

    DOM.buttonAll.addEventListener("click",()=>{
    resetBtnFilters(DOM);
    setcurrentFilter("all");
    actualizarVista(DOM);
    })

    DOM.buttonPending.addEventListener("click",()=>{
    resetBtnFilters(DOM);
    setcurrentFilter("pending");
    DOM.buttonPending.classList.add("active");
    actualizarVista(DOM);
    });

    DOM.buttonCompleted.addEventListener("click", ()=>{
    resetBtnFilters(DOM);
    setcurrentFilter("completed");
    buttonCompleted.classList.add("active");
    actualizarVista(DOM);
    })
}

function resetBtnFilters(DOM) {
    DOM.buttonAll.classList.remove("active");
    DOM.buttonPending.classList.remove("active");
    DOM.buttonCompleted.classList.remove("active");
}