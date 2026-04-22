import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar"; 
import StudentSidebar from "../../components/StudentSidebar";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}
      <StudentNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* ================= BODY ================= */}
      <div className="flex mt-4 px-4 ">
        
        {/* ================= SIDEBAR ================= */}
        <StudentSidebar sidebarOpen={sidebarOpen} />

        {/* ================= PAGE CONTENT ================= */}
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}
