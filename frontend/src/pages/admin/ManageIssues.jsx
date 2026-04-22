import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ManageIssues() {

  const [issues, setIssues] = useState([
    {
      id: 1,
      name: "Anurag Sharma",
      rollNo: "BCA101",
      issue: "Attendance not updated",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      name: "Rahul Verma",
      rollNo: "BCA102",
      issue: "Exam form not visible",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 3,
      name: "Sneha Gupta",
      rollNo: "BCA103",
      issue: "Payment receipt missing",
      priority: "Low",
      status: "Pending",
    },
  ]);

  const resolveIssue = (id) => {
    setIssues(
      issues.map((i) =>
        i.id === id ? { ...i, status: "Resolved" } : i
      )
    );
  };

  const rejectIssue = (id) => {
    setIssues(
      issues.map((i) =>
        i.id === id ? { ...i, status: "Rejected" } : i
      )
    );
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Manage Student Issues ⚠️
        </h1>
        <p className="text-blue-100 mt-1">
          Resolve or reject student complaints
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mt-6 overflow-hidden">

        {issues.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No issues found
          </p>
        ) : (

          <table className="w-full text-center">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Name</th>
                <th>Roll No</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {issues.map((i) => (

                <tr
                  key={i.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium">{i.name}</td>
                  <td>{i.rollNo}</td>
                  <td>{i.issue}</td>

                  {/* PRIORITY */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        i.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : i.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {i.priority}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        i.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : i.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="flex justify-center gap-2 py-3">

                    <button
                      disabled={i.status !== "Pending"}
                      onClick={() => resolveIssue(i.id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition disabled:opacity-40"
                    >
                      <CheckCircle size={16} /> Resolve
                    </button>

                    <button
                      disabled={i.status !== "Pending"}
                      onClick={() => rejectIssue(i.id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition disabled:opacity-40"
                    >
                      <XCircle size={16} /> Reject
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}