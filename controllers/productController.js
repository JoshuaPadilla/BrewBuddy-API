import e from "express";
import { generateUniqueFileName } from "../helpers/utils.js";
import Product from "../models/productModel.js";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  s3Client,
} from "../services/s3Client.js";
import { io } from "../app.js";

const uploadProductPictureToS3 = async (file, productName) => {
  try {
    const filename = generateUniqueFileName(
      file.originalname,
      productName.replaceAll(" ", "-")
    );

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `product-images/${filename}`, // Store in profile-pictures folder
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // Make file publicly accessible
    };

    // Upload file to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/product-images/${filename}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message:
        `In get all product: ${error.message}` || "Failed to fetch products",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProductData = req.body;

    if (req.file) {
      try {
        // Upload file to S3 and get the URL
        const productImageUrl = await uploadProductPictureToS3(
          req.file,
          newProductData.productName
        );

        // Add the image URL to the update data
        newProductData.productImageUrl = productImageUrl;

        console;
      } catch (uploadError) {
        return res.status(400).json({
          status: "error",
          message: "Failed to upload profile picture: " + uploadError.message,
        });
      }
    }

    const newProduct = await Product.create(newProductData);
    io.emit("refreshProduct");

    res.status(200).json({
      status: "success",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productID);

    if (!product) {
      res.status(404).json({
        status: "failed",
        message: "product not found",
      });
    }

    const imageKey = product.productImageUrl.split("/").slice(-2).join("/");

    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageKey,
    };

    try {
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      await s3Client.send(deleteCommand);
    } catch (err) {
      console.error("Error deleting from S3 (user model statics):", err);
    }

    await Product.findByIdAndDelete(product._id);
    io.emit("refreshProduct");

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

export const changeAvailability = async (req, res) => {
  try {
    const { productID, availability } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      isAvailable: availability === "available",
    });

    if (!updatedProduct) {
      res.status(404).json({
        status: "failed",
        message: "product not found",
      });
    }

    io.emit("refreshProduct");

    res.status(200).json({
      status: "success",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    const updatedProductForm = { ...req.body };

    if (req.file) {
      try {
        // Upload file to S3 and get the URL
        const productImageUrl = await uploadProductPictureToS3(
          req.file,
          updatedProductForm.productName
        );

        // Add the image URL to the update data
        updatedProductForm.productImageUrl = productImageUrl;
      } catch (uploadError) {
        return res.status(400).json({
          status: "error",
          message: "Failed to upload profile picture: " + uploadError.message,
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productID,

      updatedProductForm,

      { runValidator: true, new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({
        status: "failed",
        message: "product not found",
      });
    }

    io.emit("refreshProduct");

    res.status(200).json({
      status: "success",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
