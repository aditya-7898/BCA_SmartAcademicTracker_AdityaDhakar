export default function FacultyAnnouncements() {

  const announcements = [
    {
      id: 1,
      title: "Internal Marks Deadline",
      message: "Upload marks before 25 Feb.",
      audience: "Faculty",
      date: "9 Feb 2026",
    },
    {
      id: 2,
      title: "Meeting Notice",
      message: "Faculty meeting at 11 AM.",
      audience: "Faculty",
      date: "7 Feb 2026",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold text-purple-700">
        Faculty Announcements 📢
      </h1>

      <p className="text-gray-600 mt-1">
        Important notices for faculty members
      </p>

      <div className="mt-8 space-y-6">

        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements available</p>
        ) : (
          announcements.map((a) => (

            <div
              key={a.id}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-600 hover:shadow-xl transition"
            >

              <h2 className="font-bold text-lg">
                {a.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {a.message}
              </p>

              <div className="flex justify-between mt-4 text-sm">

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {a.audience}
                </span>

                <span className="text-gray-500">
                  {a.date}
                </span>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}