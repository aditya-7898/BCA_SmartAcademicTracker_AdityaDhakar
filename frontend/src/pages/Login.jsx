import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  // 🔥 Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      toast.success("Login Successful ✅");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 Remember email
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      const role = res.data.user.role;

      setTimeout(() => {
        if (role === "student") navigate("/student");
        if (role === "faculty") navigate("/faculty");
        if (role === "admin") navigate("/admin");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-200 to-indigo-200">

      {/* HEADER */}
      <div className="flex justify-between items-center px-10 py-5 bg-white/70 backdrop-blur-md shadow">
        <h1 className="text-2xl font-bold text-blue-700">
          Smart Academic Tracker
        </h1>

        <Link
          to="/"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Home
        </Link>
      </div>

      {/* LOGIN */}
      <div className="flex flex-grow justify-center items-center">

        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-md shadow-2xl p-8 rounded-2xl w-[380px]"
        >

          <h2 className="text-2xl font-bold text-center mb-6">
            Login!
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <div className="relative mb-4">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* REMEMBER ME */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember Me
            </label>

            <span className="hover:underline cursor-pointer text-gray-600">
              Forgot Password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-3 gap-8">

          <div>
            <h2 className="text-xl font-bold text-white">
              Smart Academic Tracker
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              A smart system to manage academic performance and AI insights.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-white">
              Contact
            </h3>
            <p className="mt-3 text-sm">📧 support@sat.com</p>
            <p className="text-sm">📍 India</p>
          </div>

        </div>

        <div className="border-t border-gray-700 text-center py-3 text-xs text-gray-400">
          © {new Date().getFullYear()} Smart Academic Tracker
        </div>
      </footer>

    </div>
  );
}