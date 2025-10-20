import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/nunito";
import "@fontsource/inter";

export default function Home() {
  return (
    <div className="font-nunito bg-gradient-to-br from-[#F8FBFF] via-[#FFFFFF] to-[#EAF2F8] min-h-screen flex flex-col items-center text-center overflow-hidden text-[#000000] relative">
      
      {/* Soft Background Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 px-6 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-bold drop-shadow-sm">
          Welcome to <span className="text-[#3A6D9A]">Ahsan’s Hospital</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-[#333]">
          Compassionate, high-quality healthcare made convenient.  
          Book your appointment online with just a click!
        </p>
      </motion.div>

      {/* Book Appointment Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 relative z-10"
      >
        <Link
          to="/appointment"
          className="bg-gradient-to-r from-[#3A6D9A] to-[#6A9FCB] text-white px-10 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_#B0C4DE] hover:scale-105 transition-all duration-300 font-semibold"
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
        className="mt-12 w-[90%] sm:w-[500px] md:w-[700px] rounded-3xl shadow-2xl border border-[#D6EAF8] hover:shadow-[0_0_25px_#A5C8E2] hover:scale-[1.02] transition-all duration-500 relative z-10"
      />

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 mb-20 bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 sm:p-8 md:p-10 w-[90%] sm:w-[500px] md:w-[700px] border border-[#C7DAE8]/60 hover:shadow-[0_0_25px_#C9E1F4] transition-all duration-500 relative z-10"
      >
        <h3 className="text-2xl font-semibold text-[#3A6D9A] mb-3 font-inter">
          Clinic Timings
        </h3>
        <p className="text-[#000] mb-2">
          🕘 Monday – Thursday, Saturday: 9:00 AM – 2:00 PM (30 Patients)
        </p>
        <p className="text-[#000] mb-2">
          🕘 Friday: 9:00 AM – 1:00 PM (24 Patients)
        </p>
        <p className="text-[#E53935] font-medium">🚫 Sunday: Closed</p>
      </motion.div>
    </div>
  );
}
