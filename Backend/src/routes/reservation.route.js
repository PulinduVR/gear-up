import express from "express";
import {
  checkAvailability,
  confirmReservation,
  createReservation,
  getBookingsForUserItems,
  getUserPendingReservations,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", createReservation);
router.post("/check", checkAvailability);
router.put("/confirm/:userId", confirmReservation);
router.get("/pending", getUserPendingReservations);
router.get("/:userId", getBookingsForUserItems);

export default router;
