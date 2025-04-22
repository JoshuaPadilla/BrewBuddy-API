import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("productImage"), addProduct);

router.route("/:productID").delete(deleteProduct);

export default router;
