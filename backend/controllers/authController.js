import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Email sender setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    text: `Click here to verify your account: http://localhost:5000/auth/verify/${token}`,
  });
};


// Customer Registration
export const registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role: "customer", verificationToken },
    });

    await sendVerificationEmail(email, verificationToken);
    res.json({ message: "Customer registered. Please check your email for verification." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin Registration
export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role: "admin", verificationToken },
    });

    await sendVerificationEmail(email, verificationToken);
    res.json({ message: "Admin registered. Please check your email for verification." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
const isvelid = jwt.verify(token, process.env.JWT_SECRET);
if(!isvelid){
    return res.status(400).json({error: "Invalid token"})
}
    const user = await prisma.user.updateMany({
      where: { verificationToken: token },
      data: { verified: true, verificationToken: null },
    });
res.json({message: "Email verified successfully."})
    
  } catch (error) {
    res.status(500).send("Error verifying email.");
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "You are not allowed to login from here" });
    }
    if (!user.verified) {
      return res.status(403).json({ error: "Please verify your email." });
    }

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
