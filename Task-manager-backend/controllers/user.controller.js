import { registrarUsuarioService, getUserService, loginUserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registrarUsuarioService({
      name,
      email,
      password,
    });
    console.log("USUARIO CREADO:", user)

    res.status(201).json({ ok: true, message: "User registered successfully desde Controller" });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Datos recibidos en loginUser:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const { data, error } = await loginUserService(email, password);

    if (error || !data?.session) {
      console.log("Error de login:", error?.message);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      token: data.session.access_token,
      ok: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.display_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userData = await getUserService(token);
    console.log("Datos del usuario obtenidos:", userData);
    res.status(200).json({ ok: true, user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: error.message });
  }
};
