import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // If user data missing
  if (!user) {
    return <Navigate to="/" />;
  }

  // Role-based check
  if (role && user.role !== role) {
    // Redirect to correct dashboard
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "faculty") return <Navigate to="/faculty" />;
    if (user.role === "student") return <Navigate to="/student" />;

    return <Navigate to="/" />;
  }

  return children;
}