import express from "express";
import {
  addProduct,
  changeAvailability,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("productImage"), addProduct);

router
  .route("/:productID")
  .delete(deleteProduct)
  .patch(upload.single("productImage"), editProduct);
router.route("/:productID/:availability").patch(changeAvailability);

export default router;
