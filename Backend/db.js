import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

const createTables = async () => {
  try {
    await db.execute(`
          CREATE TABLE IF NOT EXISTS users (
              user_id INT PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password_hash VARCHAR(255) NOT NULL,
              role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              verified BOOLEAN DEFAULT FALSE NOT NULL
          )
      `);

    await db.execute(`
          CREATE TABLE IF NOT EXISTS venues (
              venue_id INT PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(255) NOT NULL,
              location VARCHAR(255) NOT NULL,
              capacity INT NOT NULL,
              features TEXT,
              images JSON,
              size ENUM('small', 'medium', 'large') NOT NULL,
              bookings INT DEFAULT 0,
              status ENUM('available', 'booked') DEFAULT 'available'
          )
      `);

    await db.execute(`
          CREATE TABLE IF NOT EXISTS bookings (
              booking_id INT PRIMARY KEY AUTO_INCREMENT,
              user_id INT NOT NULL,
              venue_id INT NOT NULL,
              booking_date DATE NOT NULL,
              status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
              FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE CASCADE,
              UNIQUE (venue_id, booking_date)
          )
      `);

    console.log("📋 Database tables initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

createTables();

export default db;
