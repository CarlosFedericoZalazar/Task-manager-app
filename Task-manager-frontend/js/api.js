// api.js
const API_URL = "https://task-manager-app-back-alpha.vercel.app"; // o localhost
//const API_URL = "http://localhost:3001"; // o localhost

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: getAuthHeaders()
  });
  return res.json();
};

export async function createTask(texto, fechaVencimiento) {
  console.log(`Create Task Fecha Vencimiento: ${fechaVencimiento} - Texto: ${texto}`);  
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ 
      texto, 
      fechaVencimiento: fechaVencimiento || null 
    })
  });
  return res.json();
}

export const toggleTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: "PUT",
    headers: getAuthHeaders()
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return res.json();
};

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

// usuario

export const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            ok: false,
            error: data.error || data.message || 'Error desconocido al registrar el usuario'
        };
    }

    return data;
  } catch (error) {
    console.error('Error de red al registrar el usuario:', error);
    return { 
        ok: false, 
        error: "No se pudo conectar con el servidor." 
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

    const data = await respuestaServidor.json();

    if (!respuestaServidor.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    localStorage.setItem("token", data.token);
    return data;
  } catch (e) {
    console.error("Error al iniciar sesión:", e);
    throw e;
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener los datos del usuario");
    }

    return data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};
