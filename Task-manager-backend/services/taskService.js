import { supabase } from "../db/supabase.js";

export async function getTasksService() {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false }); // true para mostrar listado invertido

    if (error) throw error;
    return data;
}

export async function deleteTaskService(id) {
    const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .select();

    if (error) throw error;

    return data;
}

export async function postTaskService(texto){
    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                texto,
                completada: false
            }
        ])
        .select();
}

export async function modifyTaskByIdService(id, texto) {
    const { data, error } = await supabase
        .from("tasks")
        .update({ texto })
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function toggleTaskService(id) {
    // Intento leer el registro actual
    const task = await getTaskById(id); 

    if (!task) throw new Error("No existe");

    // Invertimos el valor
    const newValue = !task.completada;

    // Guardamos
    const { data, error } = await supabase
        .from("tasks")
        .update({ completada: newValue })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getTaskById(id) {
    const { data: task, error } = await supabase
        .from("tasks")
        .select("completada")
        .eq("id", id)
        .single();

    if (error) throw error;
    if (!task) throw new Error("Tarea no encontrada");

    return task; 
}
