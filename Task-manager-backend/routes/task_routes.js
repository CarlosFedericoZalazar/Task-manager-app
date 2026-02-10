import express from "express";
import {
  deleteTask,
  getAllTask,
  postNewTask,
  modifyTaskById,
  toggleTask
} from "../controllers/task_controller.js";

import { normalizeData } from "../middlewares/middleware_tasks.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.get("/", getAllTask);

router.post("/", normalizeData, postNewTask);

router.put("/:id", validateId, normalizeData, modifyTaskById);

router.put("/:id/toggle", validateId, toggleTask);

router.delete("/:id", validateId, deleteTask);

export default router;
