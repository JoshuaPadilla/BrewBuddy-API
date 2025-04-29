import User from "../models/userModel.js";
import _ from "underscore";

export const addToCart = async (req, res) => {
  try {
    const newOrderItem = req.body;
    const user = req.user;

    // Find if the item (excluding quantity and _id) already exists in the cart
    const existingCartItemIndex = user.cart.findIndex((item) => {
      return (
        item.productID.equals(newOrderItem.productID) &&
        JSON.stringify(item.addOns) === JSON.stringify(newOrderItem.addOns) &&
        JSON.stringify(item.itemSize) ===
          JSON.stringify(newOrderItem.itemSize) &&
        JSON.stringify(item.sweetnessLevel) ===
          JSON.stringify(newOrderItem.sweetnessLevel)
      );
    });

    let updatedCart = [...user.cart];

    if (existingCartItemIndex > -1) {
      // If the item exists, update the quantity and itemTotalPrice
      updatedCart[existingCartItemIndex].quantity += newOrderItem.quantity;
      updatedCart[existingCartItemIndex].itemTotalPrice +=
        newOrderItem.itemTotalPrice;
    } else {
      // If the item doesn't exist, add the new item to the cart
      updatedCart.push(newOrderItem);
    }

    await User.findByIdAndUpdate(
      user._id,
      { cart: updatedCart },
      { new: true }
    );

    res.status(200).json({ status: "success", cart: updatedCart }); // Respond with the updated cart
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

export const getUserCartItems = async (req, res) => {
  try {
    const userID = req.user._id;

    const user = await User.findById(userID).populate("cart.productID");

    res.status(200).json({ status: "success", userCart: user.cart });
  } catch (error) {
    console.error("Error getting cart items:", error); // Log the error for debugging
    res.status(500).json({ message: "Failed to get cart items" });
  }
};

export const removeItemFromUserCart = async (req, res) => {
  try {
    const userID = req.user._id;
    const itemID = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userID, {
      $pull: { cart: { _id: itemID } },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
