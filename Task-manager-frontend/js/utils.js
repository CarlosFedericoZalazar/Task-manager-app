function getLocalTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const dateHandler = (DOM) => {
  const hoy = getLocalTodayISO();

  DOM.inputDate.min = hoy;
  DOM.noDateCheckbox.checked = true;

  DOM.inputDate.addEventListener("keydown", (e) => {
    if (!["Tab", "Escape", "Enter"].includes(e.key)) {
      e.preventDefault();
    }
  });

  DOM.inputDate.addEventListener("change", () => {
    DOM.noDateCheckbox.checked = !DOM.inputDate.value;
  });

  DOM.noDateCheckbox.addEventListener("change", () => {
    if (DOM.noDateCheckbox.checked) {
      DOM.inputDate.value = "";
    } else {
      DOM.inputDate.value = hoy;
    }
  });
};

export const formatDate = (dateString) => {
  if (!dateString) return "Por definir";

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim());
  let date;

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    date = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    date = new Date(dateString);
  }

  if (Number.isNaN(date.getTime())) {
    return "Por definir";
  }

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};