import { getUserService } from "../services/user.service.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Token no proporcionado" });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ ok: false, error: "Token no proporcionado" });
  }

  try {
    const user = await getUserService(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
  }
};