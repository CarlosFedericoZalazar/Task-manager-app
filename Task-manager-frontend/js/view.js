import { formatDate } from "./utils.js";

export function renderizar(lista, tareas, handlers) {
    console.log("RENDERIZAR");
    lista.textContent = "";
    console.log("TAREA:", tareas[1]);

    for (const t of tareas) {
        const item = document.createElement("li");
        item.className = "data task-item";

        let estadoTarea = "por definir";
        const dias = t.dias_restantes;

        if (typeof dias === "number" && !Number.isNaN(dias)) {
            if (dias > 3) {
                estadoTarea = "vigente";
            } else if (dias >= 0) {
                estadoTarea = "pronto a vencer";
            } else {
                estadoTarea = "vencido";
            }
        }

        const esVencida = estadoTarea === "vencido";
        const esPorVencer = estadoTarea === "pronto a vencer" || estadoTarea === "por vencer";

        if (esVencida) {
            item.classList.add("task-vencida");
        }

        // --- FILA SUPERIOR: Título de la tarea + Estado ---
        const topRow = document.createElement("div");
        topRow.className = "task-top";

        const textoSpan = document.createElement("span");
        textoSpan.className = "texto";
        textoSpan.textContent = t.texto;

        if (t.completada) {
            textoSpan.classList.add("done");
        }

        if (esVencida) {
            textoSpan.classList.add("task-title-vencida");
        }

        textoSpan.addEventListener("click", () => {
            handlers.onToggle(t);
        });

        topRow.appendChild(textoSpan);

        if (estadoTarea) {
            const badgeEstado = document.createElement("span");
            badgeEstado.className = "task-status";

            if (esVencida) {
                badgeEstado.classList.add("status-vencido");
            } else if (esPorVencer) {
                badgeEstado.classList.add("status-por-vencer");
                badgeEstado.textContent = "🟡";

            } else {
                badgeEstado.classList.add("status-vigente");
                badgeEstado.textContent = "🟢";
            }
            if(estadoTarea !== "por definir") {
                badgeEstado.textContent = badgeEstado.textContent + " " + estadoTarea;
            }else{
                badgeEstado.textContent = "";
            }
            topRow.appendChild(badgeEstado);
        }

        // --- FILA INFERIOR: Vencimiento + Botones ---
        const bottomRow = document.createElement("div");
        bottomRow.className = "task-bottom";

        const vencimientoSpan = document.createElement("span");
        vencimientoSpan.className = "task-due";

        const fechaFormateada = t.fecha_vencimiento || "Por definir";
        if (fechaFormateada !== "Por definir") {
            vencimientoSpan.textContent = `Vence: ${formatDate(fechaFormateada)}`;
        } else {
            vencimientoSpan.textContent = "Vence: Por definir";
        }

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        const botonEdit = document.createElement("button");
        botonEdit.className = "btnTask";
        botonEdit.innerText = "✏️";

        botonEdit.addEventListener("click", () => {
            if (!t.completada) {
                handlers.onUpdate(t);
                botonDel.disabled = true;
                botonEdit.disabled = true;
            }
        });

        const botonDel = document.createElement("button");
        botonDel.className = "btnData btnTask";
        botonDel.innerText = "❌";

        botonDel.addEventListener("click", () => {
            handlers.onDelete(t);
        });

        divButtons.appendChild(botonEdit);
        divButtons.appendChild(botonDel);

        bottomRow.appendChild(vencimientoSpan);
        bottomRow.appendChild(divButtons);

        item.appendChild(topRow);
        item.appendChild(bottomRow);
        lista.appendChild(item);
    }
}
