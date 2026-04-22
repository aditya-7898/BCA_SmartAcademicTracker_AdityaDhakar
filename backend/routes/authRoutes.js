const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found ❌" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password ❌" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login Successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
});

// ================= GET LOGGED-IN USER =================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
});


// ================= CHANGE PASSWORD =================
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    // 1️⃣ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    // 2️⃣ Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Old password is incorrect ❌",
      });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Save new password
    user.password = hashedPassword;
    await user.save();

    res.json({
      msg: "Password updated successfully ✅",
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
});





module.exports = router;