import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      dbName: "gearup",
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(`Error connecting to Database. ${err}`);
  }
};

export default connectDB;
