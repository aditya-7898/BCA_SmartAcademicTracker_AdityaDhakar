import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  Bug,
  FileText,
  BarChart3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    issues: 0,
    forms: 0,
    records: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // 📊 Bar Chart Data
  const barData = [
    { name: "Students", value: stats.students },
    { name: "Faculty", value: stats.faculty },
    { name: "Issues", value: stats.issues },
    { name: "Forms", value: stats.forms },
  ];

  // 🥧 Pie Chart Data
  const pieData = [
    { name: "Students", value: stats.students },
    { name: "Faculty", value: stats.faculty },
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">
          Admin Dashboard 
        </h1>
        <p className="mt-2 text-blue-100">
          Smart analytics & system overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-6 mt-8">

        <Card icon={<Users />} title="Students" value={stats.students} />
        <Card icon={<UserCheck />} title="Faculty" value={stats.faculty} />
        <Card icon={<Bug />} title="Issues" value={stats.issues} />
        <Card icon={<FileText />} title="Forms" value={stats.forms} />
        <Card icon={<BarChart3 />} title="Records" value={stats.records} />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* BAR CHART */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
          <h2 className="font-semibold mb-4">System Overview</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
          <h2 className="font-semibold mb-4">User Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

// 🔹 Reusable Card Component
function Card({ icon, title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg p-5 rounded-xl flex items-center gap-4 hover:scale-105 transition">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}