import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RiskReport() {

  const [riskReport, setRiskReport] = useState([]);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchRiskReport = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/performance/risk-report`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRiskReport(res.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch risk report ❌");
    }
  };

  useEffect(() => {
    fetchRiskReport();
  }, []);

  // ================= FILTER =================
  const filtered = riskReport.filter((r) => {
    if (filter === "All") return true;
    return r.risk.includes(filter);
  });

  // ================= SUMMARY =================
  const high = riskReport.filter(r => r.risk.includes("High")).length;
  const medium = riskReport.filter(r => r.risk.includes("Medium")).length;
  const low = riskReport.filter(r => r.risk.includes("Low")).length;

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">
          AI Risk Prediction Dashboard 🤖
        </h1>
        <p className="text-red-100">
          Identify at-risk students and take action early
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-red-600">
          <h2 className="text-gray-500">High Risk ❌</h2>
          <p className="text-3xl font-bold text-red-600">{high}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-yellow-500">
          <h2 className="text-gray-500">Medium Risk ⚠️</h2>
          <p className="text-3xl font-bold text-yellow-600">{medium}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border-l-4 border-green-600">
          <h2 className="text-gray-500">Low Risk ✅</h2>
          <p className="text-3xl font-bold text-green-600">{low}</p>
        </div>

      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex gap-4">

        {["All", "High", "Medium", "Low"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-lg transition ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Attendance</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (

              filtered.map((r, i) => (

                <tr key={i} className="border hover:bg-gray-50">

                  <td className="p-3 font-semibold">
                    {r.student}
                  </td>

                  <td>{r.subject}</td>

                  <td className="text-green-600 font-bold">
                    {r.marks}
                  </td>

                  <td className="text-blue-600 font-bold">
                    {r.attendance}%
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        r.risk.includes("High")
                          ? "bg-red-100 text-red-700"
                          : r.risk.includes("Medium")
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {r.risk}
                    </span>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ================= AI INSIGHT ================= */}
      <div className="bg-purple-100 border-l-4 border-purple-600 p-6 rounded-xl">

        <h2 className="text-xl font-bold text-purple-800">
          🤖 AI Insight
        </h2>

        <p className="mt-2 text-gray-700">
          {high > 0
            ? `⚠️ ${high} students are in high risk. Immediate attention required.`
            : "✅ No high-risk students. System is stable."}
        </p>

      </div>

    </div>
  );
}