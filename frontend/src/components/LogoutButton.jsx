import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out ✅");

    navigate("/");
  };

  return (
    <button
      onClick={logout}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Logout
    </button>
  );
}