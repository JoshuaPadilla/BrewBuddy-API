import mongoose from "mongoose";

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
  unitOfmeasurement: {
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
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;
