import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <AdminNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <AdminSidebar sidebarOpen={sidebarOpen} />

        {/* CONTENT */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}