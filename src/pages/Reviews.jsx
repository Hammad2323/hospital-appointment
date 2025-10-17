export default function Reviews() {
  const reviews = [
    { name: "Ahmed Khan", text: "Doctor is very polite and helpful. Highly recommended!" },
    { name: "Sana Malik", text: "Easy to book and quick service. Great experience!" },
    { name: "Bilal Ahmed", text: "Clean clinic and professional treatment." },
  ];

  return (
    <div className="bg-blue-50 min-h-screen py-10 font-[Poppins] text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Reviews</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
            <p className="italic text-gray-700 mb-2">“{r.text}”</p>
            <p className="text-blue-700 font-semibold">– {r.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
