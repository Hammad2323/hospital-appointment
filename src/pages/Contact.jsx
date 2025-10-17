export default function Contact() {
  return (
    <div className="bg-blue-50 min-h-screen py-10 text-center font-[Poppins]">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h2>
      <p className="text-gray-700 mb-4">📍 Ahsan’s Hospital, Main Road, Lahore</p>
      <p className="text-gray-700 mb-4">📞 Phone: 0300-1234567</p>
      <a
        href="https://wa.me/923001234567"
        className="inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
      >
        WhatsApp Us
      </a>
      <div className="mt-8">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
}
