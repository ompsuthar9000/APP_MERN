import express from "express";
import { registerCustomer, registerAdmin, verifyEmail, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);
router.post("/register/admin", registerAdmin);
router.get("/verify/:token", verifyEmail);
router.post("/login/admin", loginAdmin);

export default router;
