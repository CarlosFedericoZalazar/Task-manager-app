export function mostrarError(mensaje) {
  const texto = mensaje || "Error del sistema";
  if (typeof window.Toastify === "function") {
    window.Toastify({
      text: texto,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#e74c3c" },
    }).showToast();
  } else {
    console.error(texto);
  }
}

export function mostrarExito(mensaje) {
  const texto = mensaje || "Operación exitosa";
  if (typeof window.Toastify === "function") {
    window.Toastify({
      text: texto,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#2ecc71" },
    }).showToast();
  } else {
    console.log(texto);
  }
}