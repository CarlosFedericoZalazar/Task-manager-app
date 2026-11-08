import { getTasksService } from "../services/taskService.js";

export const getDate = async (req, res, next) => {
    try {
        const { texto } = req.body;
        console.log(texto);

        // Cambiamos 'include' por 'includes'
        if (texto && texto.includes("//")) {
            console.log("Formato Valido");
            next();
        } else {
            console.log("Formato Invalido");
            // Es importante responder al cliente para que la petición no quede colgada
            return res.status(400).json({ error: "Formato inválido. Debe incluir '//'." });
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
}

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
