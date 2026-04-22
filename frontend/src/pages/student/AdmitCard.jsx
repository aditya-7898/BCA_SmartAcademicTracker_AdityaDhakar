import axios from "axios";
import { useState } from "react";

export default function AdmitCard() {

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const downloadAdmitCard = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admitcard/midterm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "AdmitCard.pdf");

      document.body.appendChild(link);
      link.click();

    } catch (err) {
      alert("Failed to download admit card ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Admit Card Portal 
        </h1>
        <p className="text-purple-100 mt-2">
          Download your examination admit cards easily
        </p>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* ACTIVE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

          <h2 className="text-lg font-semibold text-gray-800">
            Mid Term Exam
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Available for download
          </p>

          <button
            onClick={downloadAdmitCard}
            disabled={loading}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Downloading..." : "Download Admit Card"}
          </button>

        </div>

        {/* COMING SOON */}
        <div className="bg-white rounded-2xl shadow-lg p-6 opacity-60 cursor-not-allowed">

          <h2 className="text-lg font-semibold text-gray-800">
            Mid Term II
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Not available yet
          </p>

          <button
            disabled
            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg"
          >
            Coming Soon
          </button>

        </div>

        {/* COMING SOON */}
        <div className="bg-white rounded-2xl shadow-lg p-6 opacity-60 cursor-not-allowed">

          <h2 className="text-lg font-semibold text-gray-800">
            Repeater / Ex
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Not available yet
          </p>

          <button
            disabled
            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg"
          >
            Coming Soon
          </button>

        </div>

      </div>

      {/* ================= NOTE ================= */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl text-sm text-gray-700">
        ⚠️ Please ensure your fees are cleared before downloading the admit card.
      </div>

    </div>
  );
}