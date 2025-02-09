import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductByTitle,
  getProductsByUser,
  uploadAuth,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/upload-auth", uploadAuth);
router.get("/:title", getProductByTitle);
router.get("/:userId", getProductsByUser);

export default router;
