import {getTasksService, deleteTaskService, postTaskService, modifyTaskByIdService, toggleTaskService } from "../services/taskService.js"
export const getAllTask = async (req, res) => {
    const userId = req.user?.id;    
    try {
        const data = await getTasksService(userId);

        res.json({ ok: true, data });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user?.id;
        const data = await deleteTaskService(userId, id);

        if (!data || data.length === 0) {
            return res.status(404).json({ ok: false, message: "Tarea no encontrada" });
        }

        res.json({
            ok: true,
            message: "Tarea eliminada",
            data: data[0]
        });

    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const postNewTask = async (req, res) => {
    console.log("LLegamos a post newTask");
  try {
    const { texto, fechaVencimiento } = req.body;
    const userId = req.user?.id; 

    const data = await postTaskService(texto, fechaVencimiento, userId);

    res.status(201).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

export const modifyTaskById = async (req, res) => {    
    try {
        const id = req.params.id;
        const userId = req.user?.id; 
        const { texto } = req.body;

        const data = await modifyTaskByIdService(userId, id, texto);

        if (!data) {
            return res.status(404).json({ ok: false, message: "Tarea no encontrada" });
        }

        res.json({ ok: true, message: "Tarea actualizada", data });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

export const toggleTask = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.id;
    try {
        const data = await toggleTaskService(userId, id);

        res.json({ ok: true, message: "Tarea actualizada", data });

    } catch (error) {
        if (error.message === "Tarea no encontrada") {
            return res.status(404).json({ ok: false, message: error.message });
        }
        return res.status(500).json({ ok: false, error: error.message });
    }
};
