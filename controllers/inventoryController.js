import { getStatus } from "../helpers/utils.js";
import InventoryItem from "../models/inventoryItemModel.js";

export const addItem = async (req, res) => {
  try {
    const newItemForm = req.body;

    const status = getStatus(newItemForm.quantity);

    const newItem = await InventoryItem.create({ ...newItemForm, status });

    res.status(200).json({ status: "success", newItem });
  } catch (error) {
    console.log("failed to add inventory item: ", error);
    res.status(400).json({ status: "failed", message: error });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { orderID } = req.params;

    const status = getStatus(req.body.status);

    const updateItem = await InventoryItem.findByIdAndUpdate(
      orderID,
      { ...req.body, status },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ status: "success", updateItem });
  } catch (error) {
    console.log("failed to update inventory item: ", error);
    res.status(400).json({ status: "failed", message: error });
  }
};

export const getItem = async (req, res) => {
  try {
    const { orderID } = req.params;

    const item = await InventoryItem.findById(orderID);

    res.status(200).json({ status: "success", item });
  } catch (error) {
    console.log("failed to get inventory item: ", error);
    res.status(400).json({ status: "failed", message: error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { orderID } = req.params;

    await InventoryItem.findByIdAndDelete(orderID);

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("failed to get inventory item: ", error);
    res.status(400).json({ status: "failed", message: error });
  }
};

export const getAllItem = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();

    res.status(200).json({ status: "success", inventoryItems });
  } catch (error) {
    console.log("failed to get inventory item: ", error);
    res.status(400).json({ status: "failed", message: error });
  }
};
