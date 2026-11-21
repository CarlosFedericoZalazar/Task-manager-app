import express from "express";
import {
  deleteTask,
  getAllTask,
  postNewTask,
  modifyTaskById,
  toggleTask
} from "../controllers/task_controller.js";

import { normalizeData, validateDate } from "../middlewares/middleware_tasks.js";
import { authMiddleware } from "../middlewares/middleware_auth.js";
import { validateId } from "../middlewares/validateId.js";


const router = express.Router();

router.get("/", authMiddleware, getAllTask);

router.post("/", authMiddleware, validateDate, normalizeData, postNewTask);

router.put("/:id", authMiddleware, validateId, normalizeData, modifyTaskById);

router.put("/:id/toggle", authMiddleware, validateId, toggleTask);

router.delete("/:id", authMiddleware, validateId, deleteTask);

export default router;
