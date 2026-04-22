import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  AlertTriangle,
  LineChart,
  Megaphone,
  MessageSquare,
} from "lucide-react";

export default function FacultySidebar({ sidebarOpen }) {
  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/faculty/dashboard" },
    { name: "Upload Marks", icon: <Upload size={20} />, path: "/faculty/upload-marks" },
    { name: "Upload Attendance", icon: <Upload size={20} />, path: "/faculty/upload-attendance" },
    { name: "View Records", icon: <BarChart3 size={20} />, path: "/faculty/records" },
    { name: "Risk Report", icon: <AlertTriangle size={20} />, path: "/faculty/risk-report" },
    { name: "Analytics", icon: <LineChart size={20} />, path: "/faculty/analytics" },
    { name: "Announcements", icon: <Megaphone size={20} />, path: "/faculty/announcements" },
    { name: "Feedback", icon: <MessageSquare size={20} />, path: "/faculty/feedback" },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gradient-to-b from-indigo-500 to-purple-600 min-h-screen p-4 shadow-xl relative`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-center mb-10">
        <div className="bg-white text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
          🎓
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3 text-white text-sm">

        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-white text-purple-700 shadow-md scale-[1.02]"
                  : "hover:bg-white/20 hover:scale-[1.02]"
              }`
            }
          >
            {/* ICON */}
            <div>{item.icon}</div>

            {/* TEXT */}
            {sidebarOpen && <span>{item.name}</span>}

            {/* TOOLTIP (when collapsed) */}
            {!sidebarOpen && (
              <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}

      </nav>
    </div>
  );
}