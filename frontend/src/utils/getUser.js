import axios from "axios";

export const getLoggedInUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.get(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;

  } catch (err) {
    console.error("User fetch error:", err);
    return null;
  }
};