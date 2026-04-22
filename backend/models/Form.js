const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // auto createdAt & updatedAt
  }
);

module.exports = mongoose.model("Form", formSchema);