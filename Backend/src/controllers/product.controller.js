import productModel from "../models/product.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";

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

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
