import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ManageForms() {
  const [tab, setTab] = useState("regular");

  const [forms, setForms] = useState([
    {
      id: 1,
      name: "Anurag Sharma",
      rollNo: "BCA101",
      branch: "BCA",
      type: "Regular",
      status: "Pending",
    },
    {
      id: 2,
      name: "Rahul Verma",
      rollNo: "BCA102",
      branch: "BCA",
      type: "Repeater",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    setForms(forms.map((f) =>
      f.id === id ? { ...f, status: "Approved" } : f
    ));
  };

  const handleReject = (id) => {
    setForms(forms.map((f) =>
      f.id === id ? { ...f, status: "Rejected" } : f
    ));
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Manage Examination Forms 📝
        </h1>
        <p className="text-blue-100 mt-1">
          Approve or reject student exam applications
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setTab("regular")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            tab === "regular"
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-700 shadow hover:bg-gray-100"
          }`}
        >
          Regular Forms
        </button>

        <button
          onClick={() => setTab("repeater")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            tab === "repeater"
              ? "bg-red-600 text-white shadow"
              : "bg-white text-gray-700 shadow hover:bg-gray-100"
          }`}
        >
          Repeater / Ex Forms
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="mt-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-4">Name</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Form Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {forms
              .filter((f) =>
                tab === "regular"
                  ? f.type === "Regular"
                  : f.type !== "Regular"
              )
              .map((f) => (

                <tr
                  key={f.id}
                  className="border-t text-center hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{f.name}</td>
                  <td>{f.rollNo}</td>
                  <td>{f.branch}</td>
                  <td>{f.type}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        f.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : f.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="flex justify-center gap-2 py-3">

                    <button
                      onClick={() => handleApprove(f.id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>

                    <button
                      onClick={() => handleReject(f.id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      <XCircle size={16} /> Reject
                    </button>

                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}