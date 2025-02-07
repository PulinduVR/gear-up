import express from "express";
import {
  checkAvailability,
  confirmReservation,
  createReservation,
  getUserPendingReservations,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", createReservation);
router.post("/check", checkAvailability);
router.put("/confirm/:userId", confirmReservation);
router.get("/pending", getUserPendingReservations);

export default router;
