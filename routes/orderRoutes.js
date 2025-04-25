import express from "express";
import {
  completeOrder,
  createOrder,
  getAllOrders,
  getUserOrderForToday,
  processOrder,
} from "../controllers/orderController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { restrictToAdmin } from "../middleware/adminRoute.js";

const router = express.Router();

router.use(protectRoute);
router.route("/:userID/:date").get(getUserOrderForToday);

router.route("/process/:orderID").patch(processOrder);
router.route("/completed/:orderID").patch(completeOrder);
router.route("/").post(createOrder).get(restrictToAdmin, getAllOrders);

export default router;
