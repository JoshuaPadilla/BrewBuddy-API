import Order from "../models/orderModel.js";

export const getOrdersByDate = async (date) => {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const orders = await Order.find({
    orderDate: {
      $gte: today,
      $lt: tomorrow,
    },
  })
    .populate({
      path: "userID",
      select: "firstName lastName number email", // Specify the fields you want to retrieve
    })
    .populate("items.productID");

  if (!orders) throw new Error("User not found");

  // Map each order and update its 'items' array with only non-null productIDs
  const updatedOrders = orders.map((order) => ({
    ...order.toObject(), // Convert Mongoose document to a plain object for easier modification
    items: order.items.filter((item) => item.productID !== null),
  }));

  const validOrders = updatedOrders.filter((order) => order.items.length > 0);

  return validOrders;
};

export const getTotalSales = (orders) => {
  return orders.reduce((acc, currOrder) => {
    return (acc += currOrder.totalPrice);
  }, 0);
};
