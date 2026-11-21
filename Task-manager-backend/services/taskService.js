import { supabase } from "../db/supabase.js";

export async function getTasksService(userId) {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("id", { ascending: false }); 
    if (error) throw error;
    return data;
}

export async function deleteTaskService(userId, id) {
    const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", userId)
        .select();

    if (error) throw error;

    return data;
}

export async function postTaskService(texto, fechaVencimiento, dataUserId) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        texto,
        fecha_vencimiento: fechaVencimiento,
        user_id: dataUserId,
        completada: false
      }
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function modifyTaskByIdService(userId, id, texto) {
    const { data, error } = await supabase
        .from("tasks")
        .update({ texto })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function toggleTaskService(userId, id) {
    // Intento leer el registro actual
    const task = await getTaskById(userId, id);

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

export async function getTaskById(userId, id) {
    const { data: task, error } = await supabase
        .from("tasks")
        .select("completada")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

    if (error) throw error;
    if (!task) throw new Error("Tarea no encontrada");

    return task; 
}
