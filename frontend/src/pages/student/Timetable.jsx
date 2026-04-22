export default function Timetable() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-700">
        Timetables 📅
      </h1>

      <p className="text-gray-600 mt-1">
        Download your Timetable for the current semester. Click on the buttons below to view or download your admit cards for upcoming exams.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">
            Class Timetable
          </h2>
          <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded">
            View Timetable
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">
            Mid Term Timetable
          </h2>
          <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">
            View Timetable
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">
            End Term Timetable
          </h2>
          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
            View Timetable
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold">
                Practical Timetable
            </h2>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
                View Timetable
            </button>
        </div>
      </div>
    </div>
  );
}
