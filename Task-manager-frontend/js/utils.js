export function saveOnLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

export const dateHandler = (DOM) => {

    const hoy = new Date().toISOString().split("T")[0];

    // Asigno valor minimo y valor por defecto al input de fecha
    DOM.inputDate.min = hoy;
    DOM.noDateCheckbox.checked = true; // Marcar el checkbox como marcado por defecto

    DOM.inputDate.addEventListener("keydown", (e) => {
        // Permite Tab, Escape o Enter, pero bloquea dígitos y borrado
        if (!["Tab", "Escape", "Enter"].includes(e.key)) {
        e.preventDefault();
    }
    });

    DOM.inputDate.addEventListener("change", function () {
        const fechaSeleccionada = DOM.inputDate.value;
        console.log("Fecha seleccionada:", fechaSeleccionada);
        DOM.noDateCheckbox.checked = false; // Desmarca el checkbox si se selecciona una fecha
}); 

    DOM.noDateCheckbox.addEventListener("change", function () {
        if (DOM.noDateCheckbox.checked) {
            DOM.inputDate.value = ""; // Limpia el valor del input de fecha si se marca el checkbox
        } else {
            DOM.inputDate.value = hoy; // Restaura la fecha de hoy si se desmarca el checkbox
        }
    });
};
