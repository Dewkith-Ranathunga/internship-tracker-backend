import express from "express";
import {
    createInternship,
    deleteInternship,
    getDashboardStats,
    getInternshipById,
    getInternships,
    updateInternship,
} from "../controllers/internshipController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD
router.post("/", protect, createInternship);
router.get("/", protect, getInternships);
router.get("/:id", protect, getInternshipById);
router.put("/:id", protect, updateInternship);
router.delete("/:id", protect, deleteInternship);

// Dashboard
router.get("/stats/summary", protect, getDashboardStats);

export default router;