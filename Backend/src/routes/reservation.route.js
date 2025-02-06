import express from "express";
import {
  checkAvailability,
  createReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", createReservation);
router.post("/check", checkAvailability);

export default router;
