import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { restrictToAdmin } from "../middleware/adminRoute.js";
import {
  addItem,
  deleteItem,
  getAllItem,
  getItem,
  updateItem,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.use(protectRoute);
router.use(restrictToAdmin);

router.route("/").post(addItem).get(getAllItem);

router.route("/:orderID").get(getItem).patch(updateItem).delete(deleteItem);

export default router;
