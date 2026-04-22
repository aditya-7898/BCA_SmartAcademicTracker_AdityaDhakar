import { Outlet } from "react-router-dom";
import { useState } from "react";
import FacultyNavbar from "../../components/FacultyNavbar";
import FacultySidebar from "../../components/FacultySidebar";

export default function FacultyLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">

      {/* NAVBAR */}
      <FacultyNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <FacultySidebar sidebarOpen={sidebarOpen} />

        {/* CONTENT */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}