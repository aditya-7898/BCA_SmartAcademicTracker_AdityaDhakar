import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUsers, FaChartLine, FaCalendarCheck } from "react-icons/fa";

export default function FacultyDashboard() {

  const [user, setUser] = useState(null);
  const [studentsCount, setStudentsCount] = useState(0);

  const token = localStorage.getItem("token");

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faculty/students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudentsCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchStudents();
  }, []);

  return (
    <div className="space-y-10">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "Faculty"} !
          </h1>

          <p className="mt-2 text-indigo-100">
            Manage students, track performance & stay updated
          </p>
        </div>

        <div className="hidden md:block text-6xl opacity-20">
          🎓
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* STUDENTS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-xl">
            <FaUsers />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-2xl font-bold text-blue-700">
              {studentsCount}
            </h2>
          </div>
        </div>

        {/* MARKS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-xl text-green-600 text-xl">
            <FaChartLine />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Marks Uploaded</p>
            <h2 className="text-2xl font-bold text-green-700">
              -- 
            </h2>
          </div>
        </div>

        {/* ATTENDANCE */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600 text-xl">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Attendance Records</p>
            <h2 className="text-2xl font-bold text-purple-700">
              -- 
            </h2>
          </div>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Quick Actions ⚡
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/faculty/upload-marks"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold">
              📊 Upload Marks
            </h3>
            <p className="text-sm mt-2 opacity-90">
              Add student marks quickly
            </p>
          </Link>

          <Link
            to="/faculty/upload-attendance"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold">
              📅 Upload Attendance
            </h3>
            <p className="text-sm mt-2 opacity-90">
              Maintain attendance records
            </p>
          </Link>

          <Link
            to="/faculty/announcements"
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold">
              📢 Announcements
            </h3>
            <p className="text-sm mt-2 opacity-90">
              Notify students instantly
            </p>
          </Link>

        </div>
      </div>

      {/* ================= INFO PANEL ================= */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-l-4 border-indigo-600 p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold text-indigo-800">
          📘 Faculty Guide
        </h2>

        <p className="mt-2 text-gray-700">
          Keep student records updated regularly. Upload marks & attendance on time 
          to ensure accurate analytics and AI predictions.
        </p>

      </div>

    </div>
  );
}