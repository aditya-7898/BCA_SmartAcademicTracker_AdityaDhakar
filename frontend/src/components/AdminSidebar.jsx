import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  FileText,
  Bug,
  Megaphone,
  ShieldCheck,
  Settings,
} from "lucide-react";

export default function AdminSidebar({ sidebarOpen }) {
  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Create User", icon: <UserPlus size={20} />, path: "/admin/create-user" },
    { name: "Manage Users", icon: <Users size={20} />, path: "/admin/manage-users" },
    { name: "Manage Forms", icon: <FileText size={20} />, path: "/admin/manage-forms" },
    { name: "Manage Issues", icon: <Bug size={20} />, path: "/admin/manage-issues" },
    { name: "Announcements", icon: <Megaphone size={20} />, path: "/admin/announcements" },
    { name: "Permissions", icon: <ShieldCheck size={20} />, path: "/admin/permissions" },
    { name: "System Settings", icon: <Settings size={20} />, path: "/admin/system-settings" },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gradient-to-b from-indigo-500 to-purple-600 min-h-screen p-4 shadow-xl`}
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

            {/* TOOLTIP */}
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