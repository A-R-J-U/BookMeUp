import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./Routers/user_router.js";
import bookingRouter from "./Routers/Booking_router.js";
import venueRouter from "./Routers/Venue_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

const app = express();
const __dirname = path.resolve();

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
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/venues", venueRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "BookMeUp Server Running" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/bookmeup/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/bookmeup/dist/index.html"));
  });
}

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
