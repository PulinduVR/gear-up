import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import reviewRouter from "./routes/review.route.js";
import reservationRouter from "./routes/reservation.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/reservations", reservationRouter);

export default app;
