import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDb } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json()); // allow us to accept json data in req.body

app.use("/api/auth", authRoutes);
app.use("/api/posts", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listing on https://localhost:${PORT} ⭐`);
});
