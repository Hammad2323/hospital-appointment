import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-poppins bg-gradient-to-br from-cream to-[#FFFDF9] min-h-screen flex flex-col items-center text-center overflow-hidden">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-12 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-hospitalGreen">
          Welcome to <span className="text-[#00796B]">Ahsan’s Hospital</span>
        </h2>
        <p className="text-[#555] mt-4 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Compassionate, high-quality healthcare made convenient. Book your appointment online with just a click!
        </p>
      </motion.div>

      {/* Book Appointment Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8"
      >
        <Link
          to="/appointment"
          className="bg-hospitalGreen text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#00695C] hover:scale-105 transition-transform duration-300"
        >
          Book Appointment
        </Link>
      </motion.div>

      {/* Banner Image */}
      <motion.img
        src="/img.jpg"
        alt="Clinic Banner"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 w-[90%] sm:w-[500px] md:w-[700px] rounded-2xl shadow-xl border border-[#E0CDA9]"
      />

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 mb-16 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-[90%] sm:w-[500px] md:w-[700px] border border-[#F0E6D6]"
      >
        <h3 className="text-2xl font-semibold text-hospitalGreen mb-2">Clinic Timings</h3>
        <p className="text-[#666] mb-2">🕘 Monday – Thursday, Saturday: 9:00 AM – 2:00 PM (30 Patients)</p>
        <p className="text-[#666] mb-2">🕘 Friday: 9:00 AM – 1:00 PM (24 Patients)</p>
        <p className="text-[#E53935] font-medium">🚫 Sunday: Closed</p>
      </motion.div>
    </div>
  );
}
