import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Optional: store emails in lowercase
    trim: true, // Optional: remove leading/trailing whitespace
    validate: [validator.isEmail, "enter a valid email"],
  },
  number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      // This is works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
  cart: [
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
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.pre("save", async function (next) {
  // ONly run this function if password is modified
  if (!this.isModified("password")) return next();

  //  hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete the confirm password field
  this.confirmPassword = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
