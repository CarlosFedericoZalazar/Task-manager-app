export function renderizar(lista, tareas, handlers) {
    lista.textContent = "";

    for (let t of tareas) {
        const item = document.createElement("li");
        item.className = "data task-item";

        const textoSpan = document.createElement("span");
        textoSpan.className = "texto";
        textoSpan.textContent = t.texto;

        if (t.completada) {
            textoSpan.classList.add("done");
        }

        textoSpan.addEventListener("click", () => {
            handlers.onToggle(t);
        });
        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        const botonEdit = document.createElement("button");
        botonEdit.className = "btnTask";
        botonEdit.innerText = "✏️";

        botonEdit.addEventListener("click", () => {
            if (!t.completada) {
                handlers.onUpdate(t);
            }
        });

        const botonDel = document.createElement("button");
        botonDel.className = "btnData btnTask";
        botonDel.innerText = "❌";

        botonDel.addEventListener("click", () => {
            handlers.onDelete(t);
        });

        item.appendChild(textoSpan);
        divButtons.appendChild(botonEdit);
        divButtons.appendChild(botonDel);
        item.appendChild(divButtons);
        lista.appendChild(item);
    }
}
