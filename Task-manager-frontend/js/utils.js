export function saveOnLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

