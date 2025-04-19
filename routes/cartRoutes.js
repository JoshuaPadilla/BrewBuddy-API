import express from "express";
import {
  addToCart,
  getUserCartItems,
  removeItemFromUserCart,
} from "../controllers/cartController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.use(protectRoute);

router.route("/").post(addToCart).get(getUserCartItems);
router.route("/:id").patch(removeItemFromUserCart);

export default router;
