import express from "express";
import { deleteTask, getAllTask, postNewTask, modifyTaskById, toggleTask } from "../controllers/task_controller.js";

const router = express.Router();

router.get('/', getAllTask);

router.post('/post', postNewTask);

router.put('/:id', modifyTaskById);

router.put('/toggle/:id', toggleTask);

router.delete('/id/:id', deleteTask);

export default router;
