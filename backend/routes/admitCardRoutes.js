const express = require("express");
const PDFDocument = require("pdfkit");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= GENERATE MIDTERM ADMIT CARD ================= */
router.get(
  "/midterm-admit-card",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      // Safety check
      if (!req.user) {
        return res.status(401).json({
          msg: "Unauthorized ❌",
        });
      }

      // Headers for PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=MidTerm_AdmitCard.pdf"
      );

      // Create PDF
      const doc = new PDFDocument({ margin: 50 });
      doc.pipe(res);

      // ================= HEADER =================
      doc
        .fontSize(20)
        .text("ITM University Gwalior", { align: "center" });

      doc.moveDown(0.5);

      doc
        .fontSize(16)
        .text("MID TERM ADMIT CARD", { align: "center" });

      doc.moveDown(1);

      // ================= STUDENT DETAILS =================
      doc.fontSize(12).text(`Name: ${req.user.name}`);
      doc.text(`Email: ${req.user.email}`);
      doc.text("Course: BCA Final Year");
      doc.text("Exam: Mid Term Examination");

      doc.moveDown();

      // ================= INSTRUCTIONS =================
      doc
        .fontSize(14)
        .text("Instructions", { underline: true });

      doc.moveDown(0.5);

      doc.fontSize(12).text("• Carry this admit card to exam hall.");
      doc.text("• Bring your student ID card.");
      doc.text("• Mobile phones are not allowed.");

      doc.moveDown(2);

      // ================= FOOTER =================
      doc.text("_________________________", { align: "right" });
      doc.text("Controller of Examination", { align: "right" });

      // End PDF
      doc.end();

    } catch (err) {
      res.status(500).json({
        msg: "PDF Error",
        error: err.message,
      });
    }
  }
);

module.exports = router;