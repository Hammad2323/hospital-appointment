import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/nunito";
import "@fontsource/inter";

export default function Navbar() {
  return (
    <header className="font-nunito backdrop-blur-lg">
      {/* === Glassy Top Bar === */}
      <div className="bg-gradient-to-r from-[#3A6D9A]/90 to-[#6A9FCB]/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between px-4 py-3 text-center md:text-left text-white shadow-lg border-b border-[#A5C2D9]/40">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3"
        >
          <img
            src="/logo.jpg"
            alt="Hospital Logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#D6EAF8] shadow-md"
          />
          <h1 className="text-lg sm:text-xl md:text-3xl font-inter font-semibold tracking-wide leading-tight drop-shadow-sm">
            Ahsan’s Hospital Appointment
          </h1>
        </motion.div>

        {/* Timings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#F0F8FF] text-xs md:text-sm mt-2 md:mt-0 leading-snug"
        >
          <p className="font-medium">🕘 Mon–Thu, Sat: 9 AM – 2 PM</p>
          <p className="font-medium">🕘 Fri: 9 AM – 1 PM | 🚫 Sun: Closed</p>
        </motion.div>
      </div>

      {/* === Frosted Navbar === */}
      <nav className="backdrop-blur-md bg-[#B0C4DE]/70 shadow-inner sticky top-0 z-50 border-t border-[#9EB4C8]/50">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex flex-wrap justify-center md:justify-between gap-3 md:gap-8 text-black font-medium text-base md:text-lg">
          {["/", "/appointment", "/reviews", "/contact"].map((path, i) => {
            const labels = ["Home", "Appointment", "Reviews", "Contact"];
            return (
              <motion.div
                key={path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={path}
                  className="relative group whitespace-nowrap transition-all duration-300 hover:text-[#3A6D9A]"
                >
                  {labels[i]}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#3A6D9A] group-hover:w-full transition-all duration-500 ease-out"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm text-[#3A6D9A]">
                    {labels[i]}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
