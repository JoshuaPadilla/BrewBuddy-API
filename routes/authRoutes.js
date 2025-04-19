import express from "express";
import { checkAuth, login, register } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/check").post(protectRoute, checkAuth);

export default router;
