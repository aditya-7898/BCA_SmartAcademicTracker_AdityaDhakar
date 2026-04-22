import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200">

      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between items-center px-10 py-5 bg-white/70 backdrop-blur-md shadow sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-700">
          Smart Academic Tracker
        </h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>

      {/* ================= HERO ================= */}
      <div className="text-center mt-24 px-6">

        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Smart Academic Management System 🎓
        </h1>

        <p className="text-gray-700 mt-6 text-lg max-w-2xl mx-auto">
          Track student performance, manage academic records, and use AI-powered
          insights to improve education outcomes.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Get Started 🚀
          </Link>

          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg text-lg shadow hover:bg-gray-100">
            Learn More
          </button>
        </div>

      </div>

      {/* ================= FEATURES ================= */}
      <div className="mt-28 px-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Features
        </h2>

        <div className="grid grid-cols-3 gap-8 mt-10">

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-semibold">📊 Analytics Dashboard</h3>
            <p className="text-gray-600 mt-2">
              Real-time data insights for students, faculty, and admins.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-semibold">🤖 AI Risk Prediction</h3>
            <p className="text-gray-600 mt-2">
              Identify at-risk students using smart AI analysis.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-semibold">📝 Exam Management</h3>
            <p className="text-gray-600 mt-2">
              Manage forms, admit cards, and results seamlessly.
            </p>
          </div>

        </div>
      </div>

      {/* ================= ROLES ================= */}
      <div className="mt-28 px-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Portal Access
        </h2>

        <div className="grid grid-cols-3 gap-8 mt-10">

          <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-blue-600 hover:scale-105 transition">
            <h3 className="text-xl font-bold">Admin Panel 👑</h3>
            <p className="text-gray-600 mt-3">
              Manage users, system settings, and analytics dashboard.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-600 hover:scale-105 transition">
            <h3 className="text-xl font-bold">Faculty Panel 👨‍🏫</h3>
            <p className="text-gray-600 mt-3">
              Upload marks, monitor performance, and track risk reports.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-purple-600 hover:scale-105 transition">
            <h3 className="text-xl font-bold">Student Portal 🎓</h3>
            <p className="text-gray-600 mt-3">
              View results, attendance, and academic progress.
            </p>
          </div>

        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-28 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to Get Started?
        </h2>

        <p className="text-gray-600 mt-3">
          Join the smart academic revolution today 🚀
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 shadow-lg"
        >
          Start Now
        </Link>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Smart Academic Tracker
            </h2>
            <p className="mt-3 text-gray-400">
              A smart system to manage academic performance and AI insights.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="mt-4">📧 support@sat.com</p>
            <p>📍 India</p>
          </div>

        </div>

        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
          © {new Date().getFullYear()} Smart Academic Tracker
        </div>
      </footer>

    </div>
  );
}