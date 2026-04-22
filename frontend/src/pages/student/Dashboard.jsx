import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [summary, setSummary] = useState({
    avgMarks: 0,
    avgAttendance: 0,
    risk: "Loading...",
  });

  const token = localStorage.getItem("token");

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSummary();
    if (!user) fetchUser();
  }, []);

  return (
    <div className="p-6 space-y-10">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Hey {user?.name || "Student"} !
          </h1>

          <p className="mt-2 text-indigo-100">
            Let’s track your academic journey today.
          </p>
        </div>

        <div className="hidden md:block text-6xl opacity-20">
          🎓
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* MARKS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Overall Marks</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {summary.avgMarks}%
          </p>

          {/* PROGRESS */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${summary.avgMarks}%` }}
            />
          </div>
        </div>

        {/* ATTENDANCE */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Attendance</h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {summary.avgAttendance}%
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${summary.avgAttendance}%` }}
            />
          </div>
        </div>

        {/* RISK */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

          <h3 className="text-gray-500 text-sm">Risk Status</h3>

          <p
            className={`text-2xl font-bold mt-2
            ${
              summary.risk.includes("High")
                ? "text-red-600"
                : summary.risk.includes("Medium")
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {summary.risk}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Based on AI prediction
          </p>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Quick Actions 
        </h2>

        <div className="grid grid-cols-2 gap-6 mt-6">

          <Link
            to="/student/admit-card"
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition"
          >
            <span className="text-3xl"></span>
            <div>
              <h3 className="font-semibold">Admit Card</h3>
              <p className="text-sm text-gray-500">
                Download your hall ticket
              </p>
            </div>
          </Link>

          <Link
            to="/student/results"
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition"
          >
            <span className="text-3xl"></span>
            <div>
              <h3 className="font-semibold">Results</h3>
              <p className="text-sm text-gray-500">
                Check marks & grades
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* ================= SMART ADVISOR ================= */}
      <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl border-l-4 border-green-600 shadow">

        <h2 className="text-xl font-bold text-green-800">
          🤖 Smart Advisor
        </h2>

        <p className="mt-2 text-gray-700">
          Your current risk is <b>{summary.risk}</b>.  
          Improve attendance & stay consistent to boost performance 🚀
        </p>

      </div>

    </div>
  );
}