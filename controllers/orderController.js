import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { io } from "../app.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const userID = req.user._id;

    const newOrderForm = { ...req.body, userID };

    const newOrder = await Order.create(newOrderForm);

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("userID")
      .populate("items.productID");

    await User.findByIdAndUpdate(
      user._id,
      { orders: [...user.orders, newOrder] },
      { new: true } // Important: Return the modified document
    );

    io.emit("newIncomingOrder", populatedOrder);
    console.log("emmitted");

    res.status(201).json({
      status: "success",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Failed to create order",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userID = req.params.userID;

    const user = await User.findById(userID).populate({
      path: "orders",
      populate: {
        path: "items.productID",
        model: "Product",
      },
    });

    res.status(201).json({
      status: "success",
      userOrders: user.orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Failed to fetch orders",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the beginning of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await Order.find({
      orderDate: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate("userID")
      .populate("items.productID");

    res.status(201).json({
      status: "success",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Failed to fetch orders",
    });
  }
};

export const processOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderID,
      {
        status: "processing",
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("userID")
      .populate("items.productID");

    if (!updatedOrder)
      return res.status(400).json({
        status: "failed",
        message: "no order found",
      });

    io.emit("orderProcessed", updatedOrder);
    console.log("processed");

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Failed to update order",
    });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderID, {
      status: "completed",
    });

    if (!updatedOrder)
      return res.status(400).json({
        status: "failed",
        message: "no order found",
      });

    io.emit("onCompleteOrder", updatedOrder);

    // console.log(updatedOrder);

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Failed to update order",
    });
  }
};
