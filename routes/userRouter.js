import express from "express";
import {
    deleteUser,
    getUserProfile,
    loginUser,
    registerUser,
    updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUser);

export default router;