import { getTasksService } from "../services/taskService.js";

export const validateDate = async (req, res, next) => {
    try {
        const { texto, fechaVencimiento } = req.body;
        console.log(texto, fechaVencimiento);

        const dateNow = new Date();
        const inputDate = new Date(fechaVencimiento);

        if (inputDate < dateNow) {
            console.log("Middleware: fecha de vencimiento inválida.");
            return res.status(400).json({ error: "La fecha de vencimiento no puede ser anterior a la fecha actual." });
        }
        console.log("Middleware: fecha de vencimiento válida.");
        next();
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const normalizeData = async (req, res, next) => {
    try {
        const tasks = await getTasksService();

        // Normalizar texto
        const texto = typeof req.body.texto === "string"
            ? req.body.texto.trim().toUpperCase()
            : req.body.texto;

        if (!texto) {
            return res.status(400).json({ error: "Texto es obligatorio" });
        }

        const taskExistente = tasks.find(
            t => t.texto.toUpperCase() === texto
        );

        if (taskExistente) {
            return res.status(409).json({
                error: "El registro ya existe",
                data: taskExistente
            });
        }

        req.body.texto = texto;
        console.log("Middleware: texto normalizado, sin duplicados.");
        next();

    } catch (error) {
        return res.status(500).json({
            error: "Error al validar tareas",
            details: error.message
        });
    }
};
