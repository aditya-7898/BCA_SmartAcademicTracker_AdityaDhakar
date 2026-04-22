export default function StudentAnnouncements() {

  /* Dummy Data (Admin published) */
  const announcements = [
    {
      id: 1,
      title: "Mid Term Exams",
      message:
        "Mid term exams will start from 15 March.",
      audience: "Students",
      date: "10 Feb 2026",
    },
    {
      id: 2,
      title: "Holiday Notice",
      message:
        "University closed on 20 Feb.",
      audience: "All",
      date: "8 Feb 2026",
    },
  ];

  return (
    <div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-green-700">
        Announcements 📢
      </h1>

      <p className="text-gray-600 mt-1">
        Latest university updates & notices
      </p>

      {/* LIST */}
      <div className="mt-8 space-y-6">

        {announcements.map((a) => (

          <div
            key={a.id}
            className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-600 hover:scale-[1.01] transition"
          >

            <h2 className="font-bold text-lg">
              {a.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {a.message}
            </p>

            <div className="flex justify-between mt-4 text-sm text-gray-500">

              <span>
                Audience: {a.audience}
              </span>

              <span>{a.date}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
