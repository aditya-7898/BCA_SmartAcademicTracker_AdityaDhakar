import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, User } from "lucide-react";

export default function FacultyNavbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();

  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Marks uploaded successfully", time: "2 min ago" },
    { id: 2, text: "Attendance updated", time: "10 min ago" },
    { id: 3, text: "New student assigned", time: "30 min ago" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold text-purple-700">
          Faculty Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* 🔔 NOTIFICATIONS */}
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
            <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl z-50 animate-fadeIn">

              <div className="p-3 font-semibold border-b text-gray-700">
                Notifications
              </div>

              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 border-b hover:bg-gray-100 transition"
                >
                  <p className="text-sm">{n.text}</p>
                  <span className="text-xs text-gray-500">
                    {n.time}
                  </span>
                </div>
              ))}

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
                onClick={() => navigate("/faculty/profile")}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Profile
              </p>

              <p
                onClick={() => navigate("/faculty/change-password")}
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