import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadMarks() {

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faculty/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents(
        Array.isArray(res.data)
          ? res.data
          : res.data.students || []
      );

    } catch (err) {
      console.error(err);
      toast.error("Failed to load students ❌");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= FILTER =================
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= SUBMIT =================
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!studentId) return toast.error("Select student ❌");

    if (marks < 0 || marks > 100) {
      return toast.error("Marks must be 0–100 ❌");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/performance/add`,
        {
          studentId,
          subject,
          marks: Number(marks),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Marks Uploaded ✅");

      // reset
      setStudentId("");
      setSubject("");
      setMarks("");

    } catch (err) {
      toast.error("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Upload Marks 📊
        </h1>
        <p className="mt-2 text-green-100">
          Enter subject-wise marks for students
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-3xl shadow-lg max-w-lg space-y-4"
      >

        {/* SEARCH */}
        <input
          placeholder="🔍 Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* SELECT STUDENT */}
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select Student</option>

          {filteredStudents.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.rollNo || s.email})
            </option>
          ))}

        </select>

        {/* SUBJECT */}
        <input
          value={subject}
          placeholder="Subject (e.g. DBMS)"
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* MARKS */}
        <input
          value={marks}
          type="number"
          placeholder="Marks (0–100)"
          onChange={(e) => setMarks(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Uploading..." : "Upload Marks 🚀"}
        </button>

      </form>

      {/* EMPTY STATE */}
      {students.length === 0 && (
        <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-xl">
          ⚠ No students found. Create students from admin panel.
        </div>
      )}

    </div>
  );
}