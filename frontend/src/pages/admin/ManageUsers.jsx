import { useState } from "react";
import StudentList from "./manage/StudentList";
import FacultyList from "./manage/FacultyList";
import { Users, UserCheck } from "lucide-react";

export default function ManageUsers() {
  const [tab, setTab] = useState("students");

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Manage Users 👥
        </h1>

        <p className="text-blue-100 mt-1">
          View, update and manage all users in the system
        </p>
      </div>

      {/* TABS */}
      <div className="mt-8 flex gap-4">

        <button
          onClick={() => setTab("students")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200
          ${
            tab === "students"
              ? "bg-white text-blue-600 shadow-md scale-105"
              : "bg-white/60 backdrop-blur-md hover:bg-white/80"
          }`}
        >
          <Users size={18} />
          Students
        </button>

        <button
          onClick={() => setTab("faculty")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200
          ${
            tab === "faculty"
              ? "bg-white text-green-600 shadow-md scale-105"
              : "bg-white/60 backdrop-blur-md hover:bg-white/80"
          }`}
        >
          <UserCheck size={18} />
          Faculty
        </button>

      </div>

      {/* CONTENT */}
      <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {tab === "students" ? <StudentList /> : <FacultyList />}
      </div>

    </div>
  );
}