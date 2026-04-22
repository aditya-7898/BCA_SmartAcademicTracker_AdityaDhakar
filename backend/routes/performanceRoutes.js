const express = require("express");
const Performance = require("../models/Performance");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= ADD / UPDATE ================= */
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const { studentId, subject, marks, attendance } = req.body;

      // ✅ Validation
      if (!studentId || !subject) {
        return res.status(400).json({
          msg: "Student & Subject required ❌",
        });
      }

      if (marks == null && attendance == null) {
        return res.status(400).json({
          msg: "Provide marks or attendance ❌",
        });
      }

      // ✅ Check existing record
      let record = await Performance.findOne({
        studentId,
        subject,
      });

      if (record) {
        // UPDATE
        if (marks != null) record.marks = marks;
        if (attendance != null) record.attendance = attendance;

        await record.save();

        return res.json({
          msg: "Updated Successfully ✅",
          record,
        });
      }

      // CREATE NEW
      record = await Performance.create({
        studentId,
        subject,
        marks,
        attendance,
      });

      res.json({
        msg: "Data Saved Successfully ✅",
        record,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

/* ================= VIEW ALL (FACULTY) ================= */
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const records = await Performance.find()
        .populate("studentId", "name email")
        .select("-__v");

      res.json(records);

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

/* ================= STUDENT: VIEW OWN ================= */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const records = await Performance.find({
        studentId: req.user.id,
      }).select("-__v");

      res.json(records);

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

/* ================= RISK REPORT ================= */
router.get(
  "/risk-report",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const records = await Performance.find()
        .populate("studentId", "name email");

      const report = records.map((r) => {

        const marks = r.marks ?? 0;
        const attendance = r.attendance ?? 0;

        let risk = "Low Risk ✅";

        if (marks < 40 || attendance < 60) {
          risk = "High Risk ❌";
        } else if (marks < 70 || attendance < 80) {
          risk = "Medium Risk ⚠️";
        }

        return {
          student: r.studentId?.name || "N/A",
          subject: r.subject,
          marks,
          attendance,
          risk,
        };
      });

      res.json(report);

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);

/* ================= STUDENT DASHBOARD ================= */
router.get(
  "/summary",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const records = await Performance.find({
        studentId: req.user.id,
      });

      if (records.length === 0) {
        return res.json({
          avgMarks: 0,
          avgAttendance: 0,
          risk: "No Data Yet",
        });
      }

      const totalMarks = records.reduce(
        (sum, r) => sum + (r.marks || 0),
        0
      );

      const totalAttendance = records.reduce(
        (sum, r) => sum + (r.attendance || 0),
        0
      );

      const avgMarks = Math.round(totalMarks / records.length);
      const avgAttendance = Math.round(totalAttendance / records.length);

      let risk = "Low Risk ✅";

      if (avgMarks < 40 || avgAttendance < 60) {
        risk = "High Risk ❌";
      } else if (avgMarks < 70 || avgAttendance < 80) {
        risk = "Medium Risk ⚠️";
      }

      res.json({
        avgMarks,
        avgAttendance,
        risk,
      });

    } catch (err) {
      res.status(500).json({
        msg: "Error",
        error: err.message,
      });
    }
  }
);


// ================= ANALYTICS =================
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {
      const records = await Performance.find()
        .populate("studentId", "name");

      // ================= PERFORMANCE TREND =================
      const performanceMap = {};

      records.forEach((r) => {
        const month = new Date(r.createdAt).toLocaleString("default", {
          month: "short",
        });

        if (!performanceMap[month]) {
          performanceMap[month] = { month, total: 0, count: 0 };
        }

        performanceMap[month].total += r.marks || 0;
        performanceMap[month].count++;
      });

      const performanceData = Object.values(performanceMap).map((m) => ({
        month: m.month,
        marks: Math.round(m.total / m.count),
      }));

      // ================= ATTENDANCE =================
      const attendanceMap = {};

      records.forEach((r) => {
        if (!attendanceMap[r.subject]) {
          attendanceMap[r.subject] = { subject: r.subject, total: 0, count: 0 };
        }

        attendanceMap[r.subject].total += r.attendance || 0;
        attendanceMap[r.subject].count++;
      });

      const attendanceData = Object.values(attendanceMap).map((s) => ({
        subject: s.subject,
        attendance: Math.round(s.total / s.count),
      }));

      // ================= RISK =================
      let high = 0, medium = 0, low = 0;

      records.forEach((r) => {
        const marks = r.marks || 0;
        const attendance = r.attendance || 0;

        if (marks < 40 || attendance < 60) high++;
        else if (marks < 70 || attendance < 80) medium++;
        else low++;
      });

      const riskData = [
        { name: "High Risk", value: high },
        { name: "Medium Risk", value: medium },
        { name: "Low Risk", value: low },
      ];

      res.json({
        performanceData,
        attendanceData,
        riskData,
      });

    } catch (err) {
      res.status(500).json({ msg: "Error" });
    }
  }
);


// ================= DELETE RECORD =================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("faculty"),
  async (req, res) => {
    try {

      await Performance.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted successfully ✅" });

    } catch (err) {
      res.status(500).json({ msg: "Error deleting record" });
    }
  }
);
module.exports = router;