import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl flex items-center gap-6">

        <img
          src="https://i.pravatar.cc/120"
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {user?.name || "Student"}
          </h1>
          <p className="text-blue-100">
            {user?.branch} • {user?.rollNo}
          </p>
        </div>

      </div>

      {/* ================= INFO GRID ================= */}
      <div className="grid grid-cols-2 gap-6">

        {/* EMAIL */}
        <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Email</p>
          <h3 className="font-semibold text-gray-800">
            {user?.email}
          </h3>
        </div>

        {/* MOBILE */}
        <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Mobile</p>
          <h3 className="font-semibold text-gray-800">
            {user?.mobile}
          </h3>
        </div>

        {/* ROLL NO */}
        <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Roll Number</p>
          <h3 className="font-semibold text-gray-800">
            {user?.rollNo}
          </h3>
        </div>

        {/* BRANCH */}
        <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Branch</p>
          <h3 className="font-semibold text-gray-800">
            {user?.branch}
          </h3>
        </div>

      </div>

      {/* ================= EXTRA ================= */}
      <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded-2xl shadow">

        <h2 className="text-lg font-bold text-green-800">
          🎯 Academic Status
        </h2>

        <p className="mt-2 text-gray-700">
          You are enrolled in <b>{user?.branch}</b>.  
          Stay consistent and maintain strong academic performance 🚀
        </p>

      </div>

    </div>
  );
}