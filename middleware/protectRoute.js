import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" }); // Unauthorized
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
