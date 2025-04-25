import express from "express";
import { restrictToAdmin } from "../middleware/adminRoute.js";
import { getInsightsByDay } from "../controllers/insightsController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//

router.use(protectRoute, restrictToAdmin);

router.route("/day/:date").get(getInsightsByDay);

export default router;
