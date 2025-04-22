import User from "../models/userModel.js";

export const updateUser = async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedUser = await User.findById(req.user._id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
