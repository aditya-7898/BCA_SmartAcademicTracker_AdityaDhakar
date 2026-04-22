const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const resultRoutes = require("./routes/resultRoutes");
const admitCardRoutes = require("./routes/admitCardRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admitcard", admitCardRoutes);
app.use("/api/faculty", facultyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
