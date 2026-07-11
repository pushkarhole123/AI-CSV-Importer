import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import importRoutes from "./routes/importRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", importRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});

