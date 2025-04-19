import db from "../db.js";
import { transporter } from "../services/email.js";
import { confirmationEmail } from "../utils/email_template.js";

const createBooking = async (req, res) => {
  try {
    const user = req.user;
    const { venue_id, booking_date } = req.body;

    if (!venue_id || !booking_date)
      return res.status(400).json({ message: "Please provide all fields" });

    const existing = await db.query(
      "SELECT * FROM bookings WHERE venue_id=? AND booking_date=?",
      [venue_id, booking_date]
    );

    if (existing[0].length > 0)
      return res.status(400).json({ message: "Venue already booked" });

    const booking = await db.query(
      "INSERT INTO bookings (user_id, venue_id, booking_date) VALUES (?, ?, ?)",
      [user.id, venue_id, booking_date]
    );

    await db.query(
      "UPDATE venues SET bookings = bookings + 1 WHERE venue_id = ?",
      [venue_id]
    );

    const result = await db.query(`SELECT * FROM venues WHERE venue_id = ?`, [
      venue_id,
    ]);
    const image = result[0][0].images[0];
    const venue = result[0][0].name;

    transporter.sendMail({
      from: '"BookMeUp" <bookmeup76@gmail.com>',
      to: user.email,
      subject: "Booking Confirmation",
      html: confirmationEmail({
        venue,
        image,
        booking_id: booking[0].insertId,
        booking_date,
      }),
    });

    return res.status(201).json({
      message: "Booked successfully ",
      Booking_ID: booking[0].insertId,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const user = req.user;
    const bookings = await db.query(
      `SELECT bookings.*, venues.name, venues.images 
       FROM bookings 
       JOIN venues ON bookings.venue_id = venues.venue_id 
       WHERE bookings.user_id = ?`,
      [user.id]
    );
    if (!bookings[0].length > 0)
      return res.status(201).json({ message: "No active Bookings" });

    return res.status(200).json({ Bookings: bookings[0] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const getVenueBooking = async (req, res) => {
  try {
    const { venue_id } = req.params;

    const bookings = await db.query(
      "SELECT * FROM bookings WHERE venue_id = ?",
      [venue_id]
    );
    if (bookings[0].length == 0)
      return res.json({ message: "No Bookings for venue" });

    return res.status(200).json({ Bookings: bookings[0] });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messasge: e.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const user = req.user;

    if (!booking_id)
      return res.status(400).json({ message: "Booking ID is required" });

    const result = await db.query(
      "DELETE FROM bookings WHERE booking_id = ? AND user_id=?",
      [booking_id, user.id]
    );

    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "Unauthorized Action" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

export { createBooking, getUserBooking, getVenueBooking, deleteBooking };
