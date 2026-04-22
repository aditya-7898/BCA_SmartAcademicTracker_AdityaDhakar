import { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {

  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/results/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data);

    } catch (err) {
      console.error("Results fetch error", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Semester Results 
        </h1>
        <p className="text-purple-100 mt-2">
          View your academic performance semester-wise
        </p>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {results.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No results uploaded yet ❌
        </div>
      ) : (

        results.map((sem, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            {/* SEM HEADER */}
            <div className="flex justify-between items-center">

              <h2 className="text-xl font-bold text-gray-800">
                Semester {sem.semester}
              </h2>

              {/* SGPA BADGE */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    sem.sgpa >= 8
                      ? "bg-green-100 text-green-700"
                      : sem.sgpa >= 6
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                SGPA: {sem.sgpa}
              </span>

            </div>

            {/* TABLE */}
            <div className="mt-4 overflow-hidden rounded-xl border">

              <table className="w-full">

                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Marks</th>
                  </tr>
                </thead>

                <tbody>

                  {sem.subjects.map((s, i) => (

                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {s.name}
                      </td>

                      <td
                        className={`p-3 font-semibold
                          ${
                            s.marks < 40
                              ? "text-red-600"
                              : s.marks < 60
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                      >
                        {s.marks}
                      </td>
                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        ))

      )}

    </div>
  );
}