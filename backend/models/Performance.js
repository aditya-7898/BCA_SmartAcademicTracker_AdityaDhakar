const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ OPTIONAL
    marks: {
      type: Number,
      min: 0,
      max: 100,
    },

    // ✅ OPTIONAL
    attendance: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Performance", performanceSchema);