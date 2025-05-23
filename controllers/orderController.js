import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { io } from "../app.js";
import { endOfDay, startOfDay } from "../constants/index.js";

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

export const getUserOrderForToday = async (req, res) => {
  try {
    const { date, userID } = req.params;
    console.log(date);

    let today;
    if (date && date !== "undefined") {
      today = new Date(date);
      if (isNaN(today.getTime())) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid date format provided.",
        });
      }
    } else {
      today = new Date(); // Default to today's date if no date is provided or is "undefined"
    }

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await Order.find({
      userID,
      orderDate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).populate({
      path: "items.productID",
      model: "Product",
    });

    const updatedOrders = orders.map((order) => ({
      ...order.toObject(),
      items: order.items.filter((item) => item.productID !== null),
    }));

    const validOrders = updatedOrders.filter((order) => order.items.length > 0);

    res.status(201).json({
      status: "success",
      userOrders: validOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
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

    // Map each order and update its 'items' array with only non-null productIDs
    const updatedOrders = orders.map((order) => ({
      ...order.toObject(), // Convert Mongoose document to a plain object for easier modification
      items: order.items.filter((item) => item.productID !== null),
    }));

    const validOrders = updatedOrders.filter((order) => order.items.length > 0);

    res.status(201).json({
      status: "success",
      orders: validOrders,
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
