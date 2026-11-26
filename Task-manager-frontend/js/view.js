import { formatDate } from "./utils.js";

function obtenerEstadoVencimiento(tarea) {
  if (tarea.completada) {
    return null;
  }

  const dias = tarea.dias_restantes;
  if (typeof dias !== "number" || Number.isNaN(dias)) {
    return null;
  }

  if (dias > 3) {
    return { clase: "status-vigente", texto: "🟢 vigente", vencida: false };
  }
  if (dias > 0) {
    return { clase: "status-por-vencer", texto: "🟡 pronto a vencer", vencida: false };
  }
  return { clase: "status-vencido", texto: "🔴 vencido", vencida: true };
}

export function renderizar(lista, tareas, handlers) {
  lista.textContent = "";

  for (const t of tareas) {
    const item = document.createElement("li");
    item.className = "data task-item";

    const estado = obtenerEstadoVencimiento(t);
    const esVencida = Boolean(estado?.vencida);

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

    if (estado) {
      const badgeEstado = document.createElement("span");
      badgeEstado.className = `task-status ${estado.clase}`;
      badgeEstado.textContent = estado.texto;
      topRow.appendChild(badgeEstado);
    }

    // --- FILA INFERIOR: Vencimiento + Botones ---
    const bottomRow = document.createElement("div");
    bottomRow.className = "task-bottom";

    const vencimientoSpan = document.createElement("span");
    vencimientoSpan.className = "task-due";
    vencimientoSpan.textContent = t.fecha_vencimiento
      ? `Vence: ${formatDate(t.fecha_vencimiento)}`
      : "Vence: Por definir";

    const divButtons = document.createElement("div");
    divButtons.className = "div-buttons";

    const botonEdit = document.createElement("button");
    botonEdit.className = "btnTask";
    botonEdit.type = "button";
    botonEdit.textContent = "✏️";
    botonEdit.disabled = Boolean(t.completada);

    const botonDel = document.createElement("button");
    botonDel.className = "btnData btnTask";
    botonDel.type = "button";
    botonDel.textContent = "❌";

    botonEdit.addEventListener("click", () => {
      if (!t.completada) {
        handlers.onUpdate(t);
        botonDel.disabled = true;
        botonEdit.disabled = true;
      }
    });

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