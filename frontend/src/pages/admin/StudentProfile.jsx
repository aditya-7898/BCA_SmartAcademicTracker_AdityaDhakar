import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    branch: "",
    dob: "",
    mobile: "",
    email: "",
    fatherName: "",
    motherName: "",
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Student Profile 👨‍🎓
        </h1>
        <p className="text-blue-100 mt-1">
          Detailed student information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="mt-8 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 flex gap-10">

        {/* LEFT */}
        <div className="flex flex-col items-center w-1/3 border-r pr-6">

          <img
            src="https://i.pravatar.cc/150"
            className="w-36 h-36 rounded-full border-4 border-blue-600 shadow"
          />

          <h2 className="mt-4 text-xl font-semibold">
            {student.name}
          </h2>

          <p className="text-gray-500">
            {student.rollNo}
          </p>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <Mail size={14} /> {student.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} /> {student.mobile}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-6 flex-1">

          <Field label="Branch" value={student.branch} />
          <Field label="Date of Birth" value={student.dob} />
          <Field label="Father Name" value={student.fatherName} />
          <Field label="Mother Name" value={student.motherName} />

        </div>

      </div>

    </div>
  );
}

// 🔹 Field Component
function Field({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="font-semibold mt-1">{value || "-"}</h3>
    </div>
  );
}