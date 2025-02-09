import productModel from "../models/product.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
//import { json } from "body-parser";

dotenv.config();
export const addProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error in addProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await productModel.find({
      name: decodeURIComponent(title),
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching the product details. ", error);
    res.status(500).json({ message: "Server error." });
  }
};

import mongoose from "mongoose";

export const getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received userId:", userId); // Debugging

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const products = await productModel.find({ user: userId });
    console.log("Found products:", products); // Debugging

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this user." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
