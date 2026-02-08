import { supabase } from "../db/supabase.js";

export const getAllTask  = async (req, res) => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false }); // true para mostrar listado invertido
    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, data });
};

export const postNewTask = async (req, res) => {
    const { texto } = req.body;

    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                texto,
                completada: false
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, data });
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ ok: false, message: "ID es requerido" });
    }

    const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .select();
    
    if (!data || data.length === 0) {
        return res.status(404).json({ ok: false, message: "Tarea no encontrada" });
    }
    
    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, message: "Tarea eliminada", data: data[0] });
};

export const modifyTaskById = async (req, res) =>{
     const { id } = req.params;
     const {texto} = req.body;

     const { data, error } = await supabase
        .from("tasks")
        .update({ texto: texto })
        .eq("id", id)
        .select();
    
    if (!data || data.length === 0) {
        return res.status(404).json({ ok: false, message: "Tarea no encontrada" });
    }

    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, message: "Tarea actualizada", data: data[0] });

};


export const toggleTask = async (req, res) => {
    const { id } = req.params;

    // 1️⃣ Obtener el estado actual
    const { data: task, error: fetchError } = await supabase
        .from("tasks")
        .select("completada")
        .eq("id", id)
        .single();

    if (fetchError || !task) {
        return res.status(404).json({ ok: false, message: "Tarea no encontrada" });
    }

    // 2️⃣ Invertir
    const newValue = !task.completada;

    // 3️⃣ Guardar
    const { data, error } = await supabase
        .from("tasks")
        .update({ completada: newValue })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, message: "Tarea actualizada", data });
};
