import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, User } from "lucide-react";

export default function StudentNavbar({ toggleSidebar }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const notifications = [
    "Mid Term Exams start from 20 Feb",
    "Attendance below 75% in DBMS",
    "New marks uploaded in Java",
    "Semester fee payment due",
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="backdrop-blur-md bg-white/70 shadow-lg px-6 py-3 flex justify-between items-center border-b">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold text-green-700">
          Student Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* 🔔 NOTIFICATION */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setOpenNotif(!openNotif);
              setOpenProfile(false);
            }}
            className="relative p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Bell size={22} />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifications.length}
            </span>
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-4 z-50 animate-fadeIn">
              <h2 className="font-semibold mb-3 text-gray-700">
                Notifications
              </h2>

              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 p-2 rounded text-sm hover:bg-gray-200 transition"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setOpenProfile(!openProfile);
              setOpenNotif(false);
            }}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <User size={22} />
            <span className="font-medium">{user?.name}</span>
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-3 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl w-48 p-2 z-50 animate-fadeIn">

              <p
                onClick={() => navigate("/student/profile")}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Profile
              </p>

              <p
                onClick={() => navigate("/student/change-password")}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Change Password
              </p>

              <p
                onClick={logout}
                className="px-3 py-2 hover:bg-red-100 rounded text-red-600 cursor-pointer"
              >
                Logout
              </p>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}