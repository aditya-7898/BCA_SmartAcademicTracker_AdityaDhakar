import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword() {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= PASSWORD STRENGTH =================
  const getStrength = () => {
    const pwd = form.newPassword;

    if (pwd.length < 6) return "Weak";
    if (pwd.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)) return "Medium";
    if (pwd.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)) return "Strong";

    return "Weak";
  };

  const strength = getStrength();

  const strengthColor =
    strength === "Strong"
      ? "text-green-600"
      : strength === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  // ================= SUBMIT =================
  const handleSubmit = async () => {

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("Fill all fields ❌");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password changed successfully ✅");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">Change Password 🔑</h1>
        <p className="mt-2 text-red-100">
          Secure your account with a strong password
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md space-y-4">

        {/* OLD PASSWORD */}
        <div className="relative">
          <input
            type={show.old ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <span
            onClick={() => setShow({ ...show, old: !show.old })}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {show.old ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <div className="relative">
          <input
            type={show.new ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <span
            onClick={() => setShow({ ...show, new: !show.new })}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {show.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* 🔥 STRENGTH METER */}
        {form.newPassword && (
          <p className={`text-sm font-semibold ${strengthColor}`}>
            Strength: {strength}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={show.confirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <span
            onClick={() => setShow({ ...show, confirm: !show.confirm })}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {show.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </div>

    </div>
  );
}