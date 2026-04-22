import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";

export default function SystemSettings() {

  const [settings, setSettings] = useState({
    universityName: "",
    address: "",
    email: "",
    phone: "",
    semester: "",
    session: "",
    examMode: "Offline",
    theme: "Light",
  });

  // LOAD SETTINGS
  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      setSettings({
        universityName: "ITM University",
        address: "Gwalior, Madhya Pradesh",
        email: "info@itm.edu",
        phone: "9876543210",
        semester: "6",
        session: "2025-26",
        examMode: "Offline",
        theme: "Light",
      });
    }
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings Saved ✅");
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-3">
        <Settings />
        <div>
          <h1 className="text-2xl font-bold">
            System Settings ⚙️
          </h1>
          <p className="text-blue-100">
            Configure ERP system preferences
          </p>
        </div>
      </div>

      {/* UNIVERSITY */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          🏫 University Settings
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Input name="universityName" value={settings.universityName} onChange={handleChange} placeholder="University Name" />
          <Input name="address" value={settings.address} onChange={handleChange} placeholder="Address" />
          <Input name="email" value={settings.email} onChange={handleChange} placeholder="Email" />
          <Input name="phone" value={settings.phone} onChange={handleChange} placeholder="Phone" />
        </div>
      </div>

      {/* ACADEMIC */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          📚 Academic Settings
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <Input name="semester" value={settings.semester} onChange={handleChange} placeholder="Semester" />
          <Input name="session" value={settings.session} onChange={handleChange} placeholder="Session" />

          <select
            name="examMode"
            value={settings.examMode}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option>Offline</option>
            <option>Online</option>
          </select>
        </div>
      </div>

      {/* UI SETTINGS */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          🎨 UI Settings
        </h2>

        <div className="flex items-center gap-4">

          <span>Theme:</span>

          <button
            onClick={() =>
              setSettings({
                ...settings,
                theme: settings.theme === "Light" ? "Dark" : "Light",
              })
            }
            className={`px-4 py-2 rounded-full text-white transition ${
              settings.theme === "Light"
                ? "bg-yellow-500"
                : "bg-gray-800"
            }`}
          >
            {settings.theme} Mode
          </button>

        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

    </div>
  );
}

// 🔹 Reusable Input
function Input({ name, value, onChange, placeholder }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
  );
}