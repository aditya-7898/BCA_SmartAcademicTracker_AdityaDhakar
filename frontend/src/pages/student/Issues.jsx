import { useState, useEffect } from "react";
import axios from "axios";

export default function Issues() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/issues/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const submitIssue = async () => {
    if (!title || !message) {
      return alert("Please fill all fields ❌");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/issues/add`,
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Issue submitted ✅");

      setTitle("");
      setMessage("");

      fetchIssues();

    } catch (err) {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Raise Issue 
        </h1>
        <p className="text-red-100 mt-2">
          Report any academic or system-related problems
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-2xl">

        <h2 className="text-lg font-semibold mb-4">
          Submit New Issue
        </h2>

        <input
          value={title}
          placeholder="Issue Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <textarea
          value={message}
          placeholder="Describe your issue..."
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          onClick={submitIssue}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>

      </div>

      {/* ================= ISSUE LIST ================= */}
      <div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          My Issues 
        </h2>

        {issues.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No issues raised yet 📭
          </div>
        ) : (

          <div className="space-y-4">

            {issues.map((i) => (

              <div
                key={i._id}
                className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-gray-800">
                    {i.title}
                  </h3>

                  {/* STATUS BADGE */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold
                      ${
                        i.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : i.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {i.status || "Pending"}
                  </span>

                </div>

                <p className="text-gray-600 mt-2 text-sm">
                  {i.message}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}