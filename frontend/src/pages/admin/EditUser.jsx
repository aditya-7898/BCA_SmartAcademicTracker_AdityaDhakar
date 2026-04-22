import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    mobile: "",
    branch: "",
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/update/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Updated ✅");
      navigate("/admin/manage-users");

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Edit User ✏️
        </h1>

        <p className="text-blue-100 mt-1">
          Update user details easily
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleUpdate}
        className="mt-8 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 grid grid-cols-2 gap-5"
      >

        <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

        <Input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll No" />
        <Input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" />

        <Input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" />

        {/* BUTTON */}
        <button className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
          Update User ✅
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