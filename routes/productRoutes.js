import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("productImageUrl"), addProduct);

export default router;
