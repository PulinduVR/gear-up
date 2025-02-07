import reservationModel from "../models/reservation.model.js";
import productModel from "../models/product.model.js";
import cron from "node-cron";
import mongoose from "mongoose";

export const checkAvailability = async (req, res) => {
  try {
    const { productId, startDate, endDate } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.price) {
      return res
        .status(400)
        .json({ message: "Product daily price is missing" });
    }

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

    // Calculate the estimated cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const estimatedCost = product.price * numberOfDays;

    res.status(200).json({
      available: true,
      message: "Product is available",
      estimatedCost,
      numberOfDays,
      dailyPrice: product.price,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { userId, productId, startDate, endDate } = req.body;

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
    const totalRentPrice = product.price * numberOfDays;

    const reservation = new reservationModel({
      user: userId,
      product: productId,
      startDate,
      endDate,
      totalRentPrice,
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

export const getUserPendingReservations = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch reservations with pending status for the given user
    const reservations = await reservationModel.find({
      user: userId,
      status: "Pending",
    });

    const populatedReservations = await Promise.all(
      reservations.map(async (reservation) => {
        const product = await productModel.findById(reservation.product);
        return {
          ...reservation.toObject(),
          product: {
            name: product.name,
            img: product.img, // Use the correct field name for the image
          },
        };
      })
    );

    res.status(200).json(populatedReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const confirmReservation = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const pendingReservations = await reservationModel.find({
      user: userId,
      status: "Pending",
    });

    if (pendingReservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No pending reservations found for this user" });
    }

    // Update all pending reservations to confirmed
    const updateResult = await reservationModel.updateMany(
      { user: userId, status: "Pending" },
      { $set: { status: "Confirmed" } }
    );

    res.status(200).json({
      message: "Reservations confirmed successfully",
      updatedCount: updateResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error confirming reservations:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

cron.schedule("*/1 * * * *", async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const deleted = await reservationModel.deleteMany({
    status: "Pending",
    createdAt: { $lte: tenMinutesAgo },
  });

  if (deleted.deletedCount > 0) {
    console.log(`Deleted ${deleted.deletedCount} expired reservations.`);
  }
});
