const API_URL = "https://task-manager-app-back-alpha.vercel.app"; // o "http://localhost:3000"
//const API_URL = "http://localhost:3000"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (res, defaultErrorMsg) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || data?.message || defaultErrorMsg;
    throw new Error(message);
  }

  return data;
};

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: getAuthHeaders(),
  });
  return parseResponse(res, "Error al obtener las tareas");
};

export async function createTask(texto, fechaVencimiento) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      texto,
      fechaVencimiento: fechaVencimiento || null,
    }),
  });
  return parseResponse(res, "Error al crear la tarea");
}

export const toggleTask = async (id, updates = {}) => {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  return parseResponse(res, "Error al actualizar el estado de la tarea");
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return parseResponse(res, "Error al eliminar la tarea");
};

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  return parseResponse(res, "Error al modificar la tarea");
}

// Usuario

export const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error || data?.message || "Error desconocido al registrar el usuario",
      };
    }

    return data;
  } catch (error) {
    console.error("Error de red al registrar el usuario:", error);
    return {
      ok: false,
      error: "No se pudo conectar con el servidor.",
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const respuestaServidor = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await respuestaServidor.json().catch(() => ({}));

    if (!respuestaServidor.ok) {
      throw new Error(data?.message || data?.error || "Error al iniciar sesión");
    }

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (e) {
    console.error("Error al iniciar sesión:", e);
    throw e;
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.message || data?.error || "Error al obtener los datos del usuario");
    }

    return data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};