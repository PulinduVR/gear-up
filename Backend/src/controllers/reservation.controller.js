import reservationModel from "../models/reservation.model.js";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";

export const checkAvailability = async (req, res) => {
  try {
    const { productId, startDate, endDate } = req.body;

    const existingReservations = await reservationModel.find({
      product: productId,
      status: { $ne: "Canceled" },
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) },
        },
      ],
    });

    if (existingReservations.length > 0) {
      return res
        .status(200)
        .json({ available: false, message: "Product is not available" });
    }

    res.status(200).json({ available: true, message: "Product is available" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { userId, productId, startDate, endDate } = req.body;
    console.log("Product ID received from request:", req.body.productId);

    const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const numberOfDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalRentPrice = product.dailyPrice * numberOfDays;

    const reservation = new reservationModel({
      user: userId,
      product: productId,
      startDate,
      endDate,
      status: "Pending",
    });

    await reservation.save();
    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
      totalRentPrice,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
