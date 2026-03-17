import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/users", userRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});