// middleware.js
import { getUserService } from "../services/user.service.js"; // Ajusta la ruta si es necesario

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(`Ejecucion del authMiddlware: token ${token}`);

  if (!token) {
    return res.status(401).json({ ok: false, error: "Token no proporcionado" });
  }

  try {
    // Valida el token directamente con Supabase
    const user = await getUserService(token);

    console.log(`Backend extrar user con exito: ${user.id}`);
    
    // Guardamos el usuario en el objeto req para que el controlador lo use
    req.user = user;
    
   
    // Continuamos hacia el controlador
    next(); 
  } catch (error) {
    return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
  }
};