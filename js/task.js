export function addTarea(tarea){
    return{
        id: Date.now(),
        texto:tarea,
        completada:false
    }
}

export const borrar = (tareas, id) => {
    const tareasFilter = tareas.filter(t => t.id !== id);
    return tareasFilter;
}

export function updateTask(tareas, id, texto) {
    return tareas.map(t => {
        if (t.id === id) {
            return {
                ...t,
                texto: texto
            };
        }
        return t;
    });
}


export function toggleTarea(tareas,id) {
    const tareaToggle = tareas.map(t => {
        if(t.id === id){
            return{
                ...t,
                completada:!t.completada
            }
        }
        else return t;
    });
    tareas = tareaToggle;
    return tareas;
}
