import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { configCors } from "./config/cors";
import { healthCheck } from "./controllers/health.controller";
import { v1Router } from "./routes/v1";

import "dotenv/config";

const app = express();

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(cors(configCors));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/health", healthCheck);

// Routes
app.use("/api/v1", v1Router);

export { app };
