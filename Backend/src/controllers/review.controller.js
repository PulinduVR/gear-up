import reviewModel from "../models/review.model.js";
import mongoose from "mongoose";

export const getAllReviewsForAProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product ID is missing or literally "undefined"
    if (!id || id === "undefined") {
      return res.status(400).json({
        message: "Product ID is required",
        receivedParams: req.params, // Show all params for debugging
      });
    }

    // Decode URL-encoded characters and trim whitespace
    const cleanedProduct = decodeURIComponent(id).trim();

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(cleanedProduct)) {
      return res.status(400).json({
        message: "Invalid product ID format",
        receivedId: cleanedProduct,
      });
    }

    const reviews = await reviewModel.find({
      product: new mongoose.Types.ObjectId(cleanedProduct),
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews yet." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews. ", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const addReview = async (req, res) => {
  try {
    const newReview = new reviewModel(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error in addReview:", err);
    res.status(500).json({ error: err.message });
  }
};
