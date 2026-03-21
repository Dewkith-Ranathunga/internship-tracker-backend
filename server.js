import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import userRouter from "./routes/userRouter.js";
import startCronJobs from "./utils/cronJobs.js";

dotenv.config();

connectDB();

// after DB connection
startCronJobs();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/users", userRouter);
app.use("/api/internships", internshipRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});