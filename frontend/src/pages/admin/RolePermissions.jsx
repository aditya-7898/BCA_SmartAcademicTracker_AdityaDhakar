import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function RolePermissions() {

  const [roles, setRoles] = useState([
    {
      role: "Admin 🛠️",
      color: "border-blue-600",
      permissions: [
        { name: "Create Users", enabled: true },
        { name: "Manage Forms", enabled: true },
        { name: "Resolve Issues", enabled: true },
        { name: "Announcements", enabled: true },
      ],
    },
    {
      role: "Faculty 👨‍🏫",
      color: "border-green-600",
      permissions: [
        { name: "Upload Marks", enabled: true },
        { name: "View Records", enabled: true },
        { name: "Risk Reports", enabled: false },
      ],
    },
    {
      role: "Student 🎓",
      color: "border-purple-600",
      permissions: [
        { name: "View Dashboard", enabled: true },
        { name: "Apply Forms", enabled: true },
        { name: "View Results", enabled: true },
      ],
    },
  ]);

  // 🔥 Toggle Permission
  const togglePermission = (roleIndex, permIndex) => {
    const updated = [...roles];

    updated[roleIndex].permissions[permIndex].enabled =
      !updated[roleIndex].permissions[permIndex].enabled;

    setRoles(updated);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-3">
        <ShieldCheck />
        <div>
          <h1 className="text-2xl font-bold">
            Role Permission Manager 🔐
          </h1>
          <p className="text-blue-100">
            Control access for Admin, Faculty & Students
          </p>
        </div>
      </div>

      {/* ROLES */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        {roles.map((r, roleIndex) => (

          <div
            key={roleIndex}
            className={`bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border-l-4 ${r.color} hover:shadow-2xl transition`}
          >

            <h2 className="font-bold text-lg mb-4">
              {r.role}
            </h2>

            <ul className="space-y-3">

              {r.permissions.map((p, permIndex) => (

                <li
                  key={permIndex}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >

                  <span className="text-gray-700">
                    {p.name}
                  </span>

                  {/* TOGGLE */}
                  <button
                    onClick={() =>
                      togglePermission(roleIndex, permIndex)
                    }
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      p.enabled ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        p.enabled ? "translate-x-6" : ""
                      }`}
                    />
                  </button>

                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

    </div>
  );
}