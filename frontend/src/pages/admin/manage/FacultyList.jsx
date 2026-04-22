import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/faculty`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFaculty(res.data);

    } catch (err) {
      console.error("Error fetching faculty:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete faculty?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFaculty();

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  if (loading) {
    return <p>Loading faculty...</p>;
  }

  if (faculty.length === 0) {
    return <p>No faculty found</p>;
  }

  return (
    <table className="w-full bg-white shadow rounded-xl overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3">Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {faculty.map((s) => (
          <tr key={s._id} className="border text-center hover:bg-gray-50">
            <td className="p-2">{s.name}</td>
            <td>{s.email}</td>
            <td>{s.branch}</td>

            <td className="flex gap-2 justify-center py-2">

              <button
                onClick={() => navigate(`/admin/faculty-profile/${s._id}`)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                View
              </button>

              <button
                onClick={() => navigate(`/admin/edit-user/${s._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteUser(s._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}