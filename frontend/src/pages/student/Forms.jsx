import { useState } from "react";
import axios from "axios";

export default function Forms() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const submitForm = async () => {
    if (!title || !message) {
      return alert("Please fill all fields ❌");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forms/add`,
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Form Submitted ✅");

      setTitle("");
      setMessage("");

    } catch (err) {
      alert("Error submitting form ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Examination Form 📝
        </h1>
        <p className="text-blue-100 mt-2">
          Apply for your exam easily through the portal
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl">

        {/* TITLE */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Form Title
          </label>

          <input
            value={title}
            placeholder="Enter form title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Details
          </label>

          <textarea
            value={message}
            placeholder="Enter details..."
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submitForm}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Form"}
        </button>

      </div>

      {/* ================= INFO BOX ================= */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl text-sm text-gray-700 max-w-2xl">
        ⚠️ Make sure all details are correct before submitting the form.
      </div>

    </div>
  );
}