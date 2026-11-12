import express from 'express';
import cors from "cors";
import taskRoutes from './routes/task_routes.js';
import authRoutes from './routes/auth_routes.js';
const app = express();

// 👇👇 ESTO SIEMPRE VA ANTES DE LAS RUTAS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// 👇 tus rutas recién acá
app.use('/tasks', taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));