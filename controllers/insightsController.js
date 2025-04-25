import { getOrdersByDate, getTotalSales } from "../helpers/insightsHelpers.js";

// Helpers

export const getInsightsByDay = async (req, res) => {
  try {
    const { date } = req.params;

    const orders = await getOrdersByDate(date);

    const totalSales = getTotalSales(orders);

    res.status(201).json({
      status: "success",
      totalSales,
      orders,
    });
  } catch (error) {
    console.error("Error getting insights by day:", error); // Log the error for debugging
    res.status(500).json({ message: "Error getting insights" });
  }
};
