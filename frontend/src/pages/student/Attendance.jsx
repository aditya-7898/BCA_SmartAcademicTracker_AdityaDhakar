import { useEffect, useState } from "react";
import axios from "axios";

export default function Attendance() {

  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecords(res.data);

    } catch (err) {
      console.error("Attendance error:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Attendance </h1>
        <p className="text-blue-100 text-sm mt-1">
          Subject-wise attendance overview
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Attendance</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {records.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No attendance data found 📭
                </td>
              </tr>
            ) : (

              records.map((r, i) => (

                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* SUBJECT */}
                  <td className="p-4 font-medium text-gray-800">
                    {r.subject}
                  </td>

                  {/* PERCENT */}
                  <td className="p-4 font-semibold">
                    {r.attendance}%
                  </td>

                  {/* PROGRESS BAR */}
                  <td className="p-4 w-1/3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full
                          ${
                            r.attendance < 50
                              ? "bg-red-500"
                              : r.attendance < 75
                              ? "bg-yellow-500"
                              : "bg-green-600"
                          }`}
                        style={{ width: `${r.attendance}%` }}
                      />
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          r.attendance < 50
                            ? "bg-red-100 text-red-700"
                            : r.attendance < 75
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {r.attendance < 75 ? "Low" : "Good"}
                    </span>
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