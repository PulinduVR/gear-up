import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductByTitle,
  uploadAuth,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/upload-auth", uploadAuth);
router.get("/:title", getProductByTitle);

export default router;
