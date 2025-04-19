import express from "express";
import dotenv from "dotenv";
import userRouter from "./Routers/user_router.js";
import bookingRouter from "./Routers/Booking_router.js";
import venueRouter from "./Routers/Venue_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

const app = express();

//MIDDLEWARE
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//Routing
app.use("/users", userRouter);
app.use("/booking", bookingRouter);
app.use("/venues", venueRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "BookMeUp Server Running" });
});

// Keep the server alive
cron.schedule("*/13 * * * *", async () => {
  try {
    const alive = await axios.get(process.env.BASE_URL);
    console.log(alive?.data.message);
  } catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port: ${process.env.PORT}`);
});
