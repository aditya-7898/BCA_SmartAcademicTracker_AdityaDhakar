const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      default: "student",
    },

    mobile: {
      type: String,
      trim: true,
    },

    dob: {
      type: String,
    },

    rollNo: {
      type: String,
      unique: true,
      sparse: true, // allows null but unique when present
    },

    branch: {
      type: String,
    },

    fatherName: {
      type: String,
    },

    motherName: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);