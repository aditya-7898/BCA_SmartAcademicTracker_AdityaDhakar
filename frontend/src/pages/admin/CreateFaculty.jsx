import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function CreateFaculty() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    branch: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/create-faculty`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Faculty Created ✅");

      setForm({
        name: "",
        email: "",
        mobile: "",
        branch: "",
        password: "",
      });

    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Create Faculty 👩‍🏫
        </h1>

        <p className="text-blue-100 mt-1">
          Add new faculty member to the system
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 grid grid-cols-2 gap-5"
      >

        <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

        <Input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" />
        <Input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" />

        {/* PASSWORD */}
        <div className="col-span-2 relative">
          <input
            name="password"
            value={form.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* BUTTON */}
        <button className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
          Create Faculty ✅
        </button>

      </form>

    </div>
  );
}

// 🔹 Reusable Input
function Input({ name, value, onChange, placeholder, type = "text" }) {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
}