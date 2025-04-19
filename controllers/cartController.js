import User from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const newOrderItem = req.body;
    const user = req.user;

    await User.findByIdAndUpdate(
      user._id,
      { cart: [...user.cart, newOrderItem] },
      { new: true } // Important: Return the modified document
    );

    res.status(201).json({ status: "success" });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log the error for debugging
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
