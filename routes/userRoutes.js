import express from "express";

const router = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";
import { updateUser } from "../controllers/userController.js";

router.use(protectRoute);

router.route("/").patch(updateUser);

export default router;
