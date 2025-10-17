import { Link } from "react-router-dom";
import "@fontsource/poppins";
import "@fontsource/playfair-display";

export default function Navbar() {
  return (
    <header className="shadow-md font-poppins animate-fadeIn">
      {/* === Top Bar === */}
      <div className="bg-[#FDF6EC] flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 border-b border-[#EADBC8] text-center md:text-left">
        {/* Logo + Name */}
        <div className="flex items-center justify-center md:justify-start space-x-3">
          <img
            src="/logo.jpg"
            alt="Hospital Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E0CDA9] shadow-sm"
          />
          <h1 className="text-xl md:text-3xl font-['Playfair_Display'] text-[#005B4F] font-semibold tracking-wide">
            Ahsan’s Hospital Appointment
          </h1>
        </div>

        {/* Timings */}
        <div className="text-[#005B4F] text-xs md:text-sm mt-2 md:mt-0 leading-snug">
          <p className="font-medium">🕘 Mon–Sat: 9 AM – 2 PM</p>
          <p className="font-medium">🕘 Fri: 9 AM – 1 PM | 🚫 Sun: Closed</p>
        </div>
      </div>

      {/* === Navbar === */}
      <nav className="bg-[#00796B] shadow-inner animate-fadeInSlow">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex justify-center overflow-x-auto scrollbar-hide space-x-5 md:space-x-10 text-white font-medium text-sm md:text-lg">
          <Link
            to="/"
            className="relative group transition duration-200 whitespace-nowrap"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFD54F] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/appointment"
            className="relative group transition duration-200 whitespace-nowrap"
          >
            Appointment
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFD54F] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/reviews"
            className="relative group transition duration-200 whitespace-nowrap"
          >
            Reviews
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFD54F] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/contact"
            className="relative group transition duration-200 whitespace-nowrap"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFD54F] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
