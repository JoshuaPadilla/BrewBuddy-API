import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      // Changed items to be an array of objects
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        // Added quantity per item
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      addOns: {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
      itemSize: {
        name: {
          type: String,
          enum: ["UPsize", "Regular"],
          default: "Regular",
        },
        price: {
          type: Number,
          default: 0,
        },
      },
      sweetnessLevel: {
        name: {
          type: String,
          enum: ["Original", "Less Sweet", "Sweeter"],
          default: "Original",
        },
        price: {
          type: Number,
          default: 0,
        },
      },
      itemTotalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    // Added order date
    type: Date,
    default: Date.now,
  },
  status: {
    // Added order status
    type: String,
    enum: ["pending", "processing", "delivered", "cancelled"],
    default: "pending",
  },
  customerNote: {
    // Added customer notes
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
