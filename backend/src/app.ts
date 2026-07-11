import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import importRoutes from "./routes/importRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AI CSV Importer Backend is Running 🚀",
  });
});

app.use("/api", importRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});