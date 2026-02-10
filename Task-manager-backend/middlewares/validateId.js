
export const  validateId = async (req, res, next) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({ error: "Formato inválido, Id no es número"});
    }
    if(!Number.isInteger(id)){
        return res.status(400).json({ error: "Formato inválido, Id debe ser entero"});
    }
    if(id < 0){
        return res.status(400).json({ error: "Formato inválido, Id debe ser mayor a 0"});
    }
    next();
}
