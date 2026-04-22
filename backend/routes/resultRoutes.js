const express = require("express");
const Result = require("../models/Result");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= ADD RESULT (FACULTY) ================= */
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const { studentId, semester, subjects, totalMarks, percentage } = req.body;

      // Basic validation
      if (!studentId || !semester || !subjects) {
        return res.status(400).json({
          msg: "Required fields missing ❌",
        });
      }

      const result = await Result.create({
        studentId,
        semester,
        subjects,
        totalMarks,
        percentage,
      });

      res.json({
        msg: "Result Uploaded ✅",
        result,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

/* ================= STUDENT VIEW OWN RESULTS ================= */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const results = await Result.find({
        studentId: req.user.id,
      }).select("-__v");

      res.json(results);

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

module.exports = router;