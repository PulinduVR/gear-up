import express from "express";
import {
  checkAvailability,
  confirmReservation,
  createReservation,
  getBookingsForUserItems,
  getReservationsHistory,
  getReservationsUpcoming,
  getUserPendingReservations,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", createReservation);
router.post("/check", checkAvailability);
router.put("/confirm/:userId", confirmReservation);
router.get("/pending", getUserPendingReservations);
router.get("/:userId", getBookingsForUserItems);
router.get("/upcoming/:userId", getReservationsUpcoming);
router.get("/history/:userId", getReservationsHistory);

export default router;
