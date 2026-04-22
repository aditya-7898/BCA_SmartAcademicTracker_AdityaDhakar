import { useNavigate } from "react-router-dom";
import { GraduationCap, UserCheck } from "lucide-react";

export default function CreateUser() {
  const navigate = useNavigate();

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">
          Create User Portal 
        </h1>

        <p className="mt-2 text-blue-100">
          Select the type of user you want to create
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* STUDENT */}
        <div
          onClick={() => navigate("/admin/create-student")}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 cursor-pointer hover:scale-105 transition duration-300 flex items-center gap-6"
        >
          <div className="bg-blue-100 p-4 rounded-full">
            <GraduationCap className="text-blue-600" size={28} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Create Student
            </h2>

            <p className="text-gray-500 mt-1">
              Add new student academic account
            </p>
          </div>
        </div>

        {/* FACULTY */}
        <div
          onClick={() => navigate("/admin/create-faculty")}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 cursor-pointer hover:scale-105 transition duration-300 flex items-center gap-6"
        >
          <div className="bg-green-100 p-4 rounded-full">
            <UserCheck className="text-green-600" size={28} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Create Faculty
            </h2>

            <p className="text-gray-500 mt-1">
              Add new faculty teaching account
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}