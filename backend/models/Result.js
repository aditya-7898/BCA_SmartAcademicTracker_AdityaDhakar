const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    subjects: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        marks: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    ],

    sgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);