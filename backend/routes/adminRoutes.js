const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= CREATE STUDENT ================= */
router.post(
  "/create-student",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        mobile,
        dob,
        rollNo,
        fatherName,
        motherName,
        branch,
        password,
      } = req.body;

      const exists = await User.findOne({
        $or: [{ email }, { rollNo }],
      });

      if (exists) {
        return res.status(400).json({
          msg: "Student already exists ❌",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await User.create({
        name,
        email,
        mobile,
        dob,
        rollNo,
        fatherName,
        motherName,
        branch,
        password: hashedPassword,
        role: "student",
      });

      res.json({
        msg: "Student Created ✅",
        student,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
        error: err.message,
      });
    }
  }
);

/* ================= CREATE FACULTY ================= */
router.post(
  "/create-faculty",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { name, email, mobile, branch, password } = req.body;

      const exists = await User.findOne({ email });

      if (exists) {
        return res.status(400).json({
          msg: "Faculty already exists ❌",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const faculty = await User.create({
        name,
        email,
        mobile,
        branch,
        password: hashedPassword,
        role: "faculty",
      });

      res.json({
        msg: "Faculty Created ✅",
        faculty,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
        error: err.message,
      });
    }
  }
);

/* ================= GET ALL STUDENTS ================= */
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).select("-password");
      res.json(students);
    } catch (err) {
      res.status(500).json({
        msg: "Error fetching students",
      });
    }
  }
);

/* ================= GET ALL FACULTY ================= */
router.get(
  "/faculty",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const faculty = await User.find({ role: "faculty" }).select("-password");
      res.json(faculty);
    } catch (err) {
      res.status(500).json({
        msg: "Error fetching faculty",
      });
    }
  }
);

/* ================= DELETE USER ================= */
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({
        msg: "User Deleted Successfully 🗑️",
      });

    } catch (err) {
      res.status(500).json({
        msg: "Delete Failed ❌",
      });
    }
  }
);

/* ================= UPDATE USER ================= */
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        msg: "User Updated",
        updatedUser,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Update Failed",
      });
    }
  }
);

/* ================= GET SINGLE USER ================= */
router.get(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(500).json({
        msg: "Error fetching user",
      });
    }
  }
);


/* ================= ADMIN ANALYTICS ================= */
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: "student" });
      const totalFaculty = await User.countDocuments({ role: "faculty" });

      res.json({
        students: totalStudents,
        faculty: totalFaculty,
        issues: 0,   // you can connect later
        forms: 0,
        records: 0,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Analytics error",
        error: err.message,
      });
    }
  }
);

module.exports = router;
