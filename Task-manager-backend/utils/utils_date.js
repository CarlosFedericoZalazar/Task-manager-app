export const calcularDiasRestantes = (fechaVencimiento ) => {
  if (!fechaVencimiento) return null;

  // Extrae YYYY-MM-DD para evitar desfases por zona horaria
  const [year, month, day] = String(fechaVencimiento).slice(0, 10).split("-").map(Number);
  const vencimientoUtc = Date.UTC(year, month - 1, day);

  const ahora = new Date();
  const hoyUtc = Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate());

  const msPorDia = 1000 * 60 * 60 * 24;
  return Math.round((vencimientoUtc - hoyUtc) / msPorDia);
}