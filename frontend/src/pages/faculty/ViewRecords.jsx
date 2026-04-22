import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewRecords() {

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecords(res.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch records ❌");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ================= FILTER =================
  const filtered = records.filter((r) =>
    r.studentId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.subject?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this record?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/performance/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Deleted ✅");
      fetchRecords();

    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">
          Student Records 📊
        </h1>
        <p className="text-purple-100">
          View and manage uploaded marks & attendance
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        placeholder="🔍 Search by student or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Attendance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (

              filtered.map((r) => (

                <tr key={r._id} className="border hover:bg-gray-50">

                  {/* STUDENT */}
                  <td className="p-3 font-semibold">
                    {r.studentId?.name || "N/A"}
                  </td>

                  {/* SUBJECT */}
                  <td>{r.subject}</td>

                  {/* MARKS */}
                  <td className="font-bold text-green-600">
                    {r.marks ?? "--"}
                  </td>

                  {/* ATTENDANCE */}
                  <td className="font-bold text-blue-600">
                    {r.attendance != null ? `${r.attendance}%` : "--"}
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2 justify-center py-2">

                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}