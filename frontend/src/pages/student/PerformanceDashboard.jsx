import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PerformanceDashboard() {

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    avgMarks: 0,
    avgAttendance: 0,
    risk: "",
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;
      setRecords(data);

      let totalMarks = 0;
      let totalAttendance = 0;

      data.forEach((r) => {
        totalMarks += r.marks || 0;
        totalAttendance += r.attendance || 0;
      });

      const avgMarks = data.length ? (totalMarks / data.length).toFixed(1) : 0;
      const avgAttendance = data.length ? (totalAttendance / data.length).toFixed(1) : 0;

      let risk = "Low";

      if (avgMarks < 40 || avgAttendance < 60) {
        risk = "High ❌";
      } else if (avgMarks < 60 || avgAttendance < 75) {
        risk = "Medium ⚠️";
      } else {
        risk = "Low ✅";
      }

      setSummary({ avgMarks, avgAttendance, risk });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Performance Dashboard 
        </h1>
        <p className="text-purple-100 mt-2">
          Analyze your academic performance with AI insights.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* MARKS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Average Marks</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {summary.avgMarks}%
          </p>

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
          <h3 className="text-gray-500 text-sm">AI Risk</h3>

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
            Based on performance analysis
          </p>
        </div>

      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Subject-wise Performance 📈
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={records}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks" />
            <Bar dataKey="attendance" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* ================= AI ADVISOR ================= */}
      <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl border-l-4 border-green-600 shadow">

        <h2 className="text-xl font-bold text-green-800">
          🤖 Smart Advisor
        </h2>

        <p className="mt-2 text-gray-700">
          Your current risk is <b>{summary.risk}</b>.  
          Focus on weak subjects and maintain attendance above 75% 🚀
        </p>

      </div>

    </div>
  );
}