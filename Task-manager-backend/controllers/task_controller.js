import {getTasksService, deleteTaskService, postTaskService, modifyTaskByIdService, toggleTaskService } from "../services/taskService.js"

export const getAllTask = async (req, res) => {
    try {
        const data = await getTasksService();

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
        const { id } = req.params;
        const data = await deleteTaskService(id);

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
    try {
        const { texto } = req.body;
        const data = await postTaskService(texto);

        res.status(201).json({ ok: true, data });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

export const modifyTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;

        const data = await modifyTaskByIdService(id, texto);

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
    try {
        const { id } = req.params;

        const data = await toggleTaskService(id);

        res.json({ ok: true, message: "Tarea actualizada", data });

    } catch (error) {
        if (error.message === "Tarea no encontrada") {
            return res.status(404).json({ ok: false, message: error.message });
        }
        return res.status(500).json({ ok: false, error: error.message });
    }
};
