export default function MidTermAdmit() {
  const downloadAdmit = () => {
    window.open("http://localhost:5000/api/admitcard/midterm", "_blank");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700">
        Mid Term Admit Card 🎫
      </h1>

      <p className="mt-2 text-gray-600">
        Click below to download your Mid Term Admit Card PDF.
      </p>

      <button
        onClick={downloadAdmit}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
      >
        Download Admit Card 📄
      </button>
    </div>
  );
}
