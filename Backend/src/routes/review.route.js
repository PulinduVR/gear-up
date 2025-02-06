import express from "express";
import {
  addReview,
  getAllReviewsForAProduct,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:id", getAllReviewsForAProduct);
router.post("/", addReview);

export default router;
