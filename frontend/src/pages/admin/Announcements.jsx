import { useState } from "react";
import { Megaphone, Send } from "lucide-react";

export default function Announcements() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "Students",
  });

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Mid Term Exams",
      message: "Exams start from 15 March",
      audience: "Students",
    },
  ]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = () => {
    if (!form.title || !form.message) {
      return alert("Please fill all fields ❌");
    }

    setAnnouncements([
      {
        id: Date.now(),
        ...form,
      },
      ...announcements,
    ]);

    alert("Announcement Published 📢");

    setForm({
      title: "",
      message: "",
      audience: "Students",
    });
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-3">
        <Megaphone />
        <div>
          <h1 className="text-2xl font-bold">
            Announcement System 📢
          </h1>
          <p className="text-blue-100">
            Create and broadcast updates instantly
          </p>
        </div>
      </div>

      {/* CREATE ANNOUNCEMENT */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Create Announcement
        </h2>

        <input
          name="title"
          value={form.title}
          placeholder="Enter title..."
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Write announcement message..."
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          rows={4}
        />

        <select
          name="audience"
          value={form.audience}
          onChange={handleChange}
          className="border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option>Students</option>
          <option>Faculty</option>
          <option>All</option>
        </select>

        <button
          onClick={handlePublish}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Send size={16} />
          Publish
        </button>

      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="mt-6">

        <h2 className="text-xl font-semibold mb-4">
          Published Announcements
        </h2>

        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet</p>
        ) : (

          <div className="grid gap-4">

            {announcements.map((a) => (

              <div
                key={a.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {a.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {a.message}
                </p>

                {/* AUDIENCE BADGE */}
                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                    a.audience === "Students"
                      ? "bg-blue-100 text-blue-700"
                      : a.audience === "Faculty"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {a.audience}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}