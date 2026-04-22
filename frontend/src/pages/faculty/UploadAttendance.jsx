import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadAttendance() {

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [attendance, setAttendance] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faculty/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents(Array.isArray(res.data) ? res.data : res.data.students || []);

    } catch (err) {
      toast.error("Failed to load students ❌");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) return toast.error("Select student ❌");

    if (attendance < 0 || attendance > 100) {
      return toast.error("Attendance must be 0–100 ❌");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/performance/add`,
        {
          studentId,
          subject,
          attendance: Number(attendance),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Attendance Uploaded ✅");

      setStudentId("");
      setSubject("");
      setAttendance("");

    } catch (err) {
      toast.error("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Upload Attendance 📅
        </h1>
        <p className="mt-2 text-blue-100">
          Maintain accurate attendance records
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow max-w-lg space-y-4"
      >

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select Student</option>

          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.rollNo || s.email})
            </option>
          ))}
        </select>

        <input
          value={subject}
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          value={attendance}
          type="number"
          placeholder="Attendance %"
          onChange={(e) => setAttendance(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Attendance"}
        </button>

      </form>

    </div>
  );
}