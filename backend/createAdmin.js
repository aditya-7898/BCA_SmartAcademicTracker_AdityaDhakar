const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    // Use env password OR fallback
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@college.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin Created Successfully!");
    console.log("📌 Login Credentials:");
    console.log("Email: admin@college.com");
    console.log("Password:", adminPassword);

    // Close DB
    await mongoose.connection.close();
    process.exit();

  } catch (err) {
    console.log("❌ Error Creating Admin:", err.message);
    process.exit();
  }
};

createAdmin();