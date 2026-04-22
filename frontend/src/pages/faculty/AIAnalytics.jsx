import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AIAnalytics() {

  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [riskData, setRiskData] = useState([]);

  const token = localStorage.getItem("token");

  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/analytics`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPerformanceData(res.data.performanceData);
      setAttendanceData(res.data.attendanceData);
      setRiskData(res.data.riskData);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700">
        AI Academic Analytics 🤖📊
      </h1>

      <p className="text-gray-600 mt-1">
        Real-time insights based on student data
      </p>

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* PERFORMANCE */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">Performance Trend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="marks" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ATTENDANCE */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">Attendance Analysis</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RISK */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">Risk Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskData} dataKey="value" outerRadius={90}>
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
          <h2 className="font-semibold mb-4 text-blue-800">
            AI Insights 🤖
          </h2>

          <ul className="space-y-3 text-gray-700">

            <li>✔ Monitor high-risk students regularly</li>
            <li>✔ Improve low attendance subjects</li>
            <li>✔ Focus on weak performance areas</li>
            <li>✔ Encourage consistent study habits</li>

          </ul>

        </div>

      </div>

    </div>
  );
}