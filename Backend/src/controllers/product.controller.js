import productModel from "../models/product.model.js";

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
