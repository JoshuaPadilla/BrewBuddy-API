import mongoose from "mongoose";
import { type } from "os";

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitOfMeasurement: {
    type: String,
    enum: ["kg", "liters", "pcs"],
    default: "pcs",
  },
  status: {
    // Added order status
    type: String,
    enum: ["low", "out", "in"],
    default: "in",
  },
  category: {
    type: String,
    enum: ["Add Ons", "Essentials"],
    default: "Essentials",
  },
  price: {
    type: Number,
  },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;
