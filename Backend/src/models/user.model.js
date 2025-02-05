import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    // userID: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    // status: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
