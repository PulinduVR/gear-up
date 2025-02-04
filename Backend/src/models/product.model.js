import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // productID: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    description: {
      type: String,
    },
    visibility: {
      type: Boolean,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
