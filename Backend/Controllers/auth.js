import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../services/email.js";
import {
  verificationEmail,
  verifiedTemplate,
} from "../utils/email_template.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    try {
      const existingUser = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (existingUser[0].length > 0)
        return res.status(400).json({ message: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = await db.query(
        "INSERT INTO users (name,email,password_hash) VALUES (?,?,?)",
        [name, email, hashedPass]
      );

      const emailToken = jwt.sign(
        { user: newUser[0]?.insertId },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
      );

      const url = `${process.env.BASE_URL}/users/verify/${emailToken}`;

      transporter.sendMail({
        from: '"BookMeUp" <bookmeup76@gmail.com>',
        to: email,
        subject: "Verification Email",
        html: verificationEmail(url, name),
      });

      return res
        .status(201)
        .send({ message: "User created successfully", userID: newUser[0] });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email = ? ", [
      email,
    ]);

    if (user[0].length == 0)
      return res.status(404).json({ message: "User not found" });

    const usr = user[0][0];

    if (usr.verified == 0)
      return res.status(401).json({ message: "Verify your email first" });

    const pass = await bcrypt.compare(password, usr.password_hash);
    if (!pass) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: usr.email, id: usr.user_id },
      process.env.JWT_SECRET
    );

    return res
      .cookie("Authorization", "Bearer" + " " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/",
        domain: "bookmeup-a12k.onrender.com",
      })
      .json({ message: "User signed in successfully", token: token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const signout = async (req, res) => {
  try {
    return res
      .clearCookie("Authorization", { path: "/" })
      .json({ message: "User signed out successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const qr = await db.query("SELECT * FROM users WHERE email = ? ", [
      user.email,
    ]);
    const usr = qr[0][0];

    return res.status(200).json(usr);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.user;
    await db.query("UPDATE users SET verified = TRUE WHERE user_id = ?", [id]);
    return res.status(200).send(verifiedTemplate());
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

export { signup, signin, signout, getUser, verifyEmail };
