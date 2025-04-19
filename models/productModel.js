import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
    enum: ["Classic", "Fruit-Flavored", "Dessert-Inspired"],
  },
  productBasePrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImageUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
