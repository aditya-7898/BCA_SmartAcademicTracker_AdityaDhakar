const express = require("express");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= GET STUDENTS FOR FACULTY ================= */
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).select("-password");
      res.json(students);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching students" });
    }
  }
);

module.exports = router;