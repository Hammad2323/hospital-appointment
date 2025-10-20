import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import html2canvas from "html2canvas";
import emailjs from "emailjs-com";
import "@fontsource/nunito";
import "@fontsource/inter";

export default function Appointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [message, setMessage] = useState("");

  const generateSlots = (selectedDate) => {
    const day = new Date(selectedDate).getDay();
    if (day === 0) {
      setMessage("❌ Sunday is closed. Please select another day.");
      setSlots([]);
      return;
    }
    let generatedSlots = [];
    const startHour = 9;
    const endHour = day === 5 ? 20 : 17;
    for (let h = startHour; h <= endHour; h++) {
      generatedSlots.push(`${h}:00`);
      generatedSlots.push(`${h}:30`);
    }
    setMessage("");
    setSlots(generatedSlots);
  };

  const fetchBookedSlots = async (selectedDate) => {
    if (!selectedDate) return;
    try {
      const q = query(collection(db, "appointments"), where("date", "==", selectedDate));
      const querySnapshot = await getDocs(q);
      const booked = querySnapshot.docs.map((doc) => doc.data().time);
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  useEffect(() => {
    if (date) {
      generateSlots(date);
      fetchBookedSlots(date);
    }
  }, [date]);

  const handleConfirm = async () => {
    if (!name || !phone || !date || !selectedTime) {
      alert("⚠️ Please fill all required fields.");
      return;
    }
    try {
      const q = query(
        collection(db, "appointments"),
        where("date", "==", date),
        where("time", "==", selectedTime)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        alert("⚠️ This time slot is already booked. Please select another one.");
        fetchBookedSlots(date);
        return;
      }

      const newAppointment = { name, phone, symptoms, date, time: selectedTime, createdAt: new Date().toISOString() };
      await addDoc(collection(db, "appointments"), newAppointment);
      localStorage.setItem("appointment", JSON.stringify(newAppointment));
      setAppointment(newAppointment);

      try {
        await emailjs.send("service_szhge4j", "template_wfuka4a", {
          name: newAppointment.name,
          phone: newAppointment.phone,
          date: newAppointment.date,
          time: newAppointment.time,
          symptoms: newAppointment.symptoms || "Not provided",
        }, "eGLXq860KTfTP6LZB");
        alert("✅ Appointment confirmed! Email sent to clinic.");
      } catch (err) {
        console.error("❌ EmailJS Error:", err);
        alert("⚠️ Appointment saved, but email could not be sent.");
      }

      fetchBookedSlots(date);
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong while booking appointment.");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("appointment");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAppointment(parsed);
      const now = new Date();
      const appTime = new Date(`${parsed.date} ${parsed.time}`);
      if (appTime < now) setMessage("⚠️ Your appointment has passed. Please book a new one.");
    }
  }, []);

  const handleDownload = async () => {
    const element = document.getElementById("appointment-details");
    const hiddenMessage = document.getElementById("download-message");
    hiddenMessage.style.display = "block";
    const canvas = await html2canvas(element);
    hiddenMessage.style.display = "none";
    const link = document.createElement("a");
    link.download = "appointment.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  return (
    <div className="font-nunito flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F8FBFF] via-[#FFFFFF] to-[#EAF2F8] px-4 py-10">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg border-2 border-[#B0C4DE] rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_25px_#B0C4DE]">
        <h1 className="text-2xl sm:text-3xl font-inter font-semibold text-center text-[#3A6D9A] mb-6">
          Book Your Appointment
        </h1>

        <div className="space-y-3">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-[#B0C4DE] rounded-lg focus:border-[#3A6D9A] focus:ring-2 focus:ring-[#B0C4DE]/50 outline-none text-sm sm:text-base placeholder-gray-500" />
          <input type="tel" placeholder="Contact Number" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-[#B0C4DE] rounded-lg focus:border-[#3A6D9A] focus:ring-2 focus:ring-[#B0C4DE]/50 outline-none text-sm sm:text-base placeholder-gray-500" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-[#B0C4DE] rounded-lg focus:border-[#3A6D9A] focus:ring-2 focus:ring-[#B0C4DE]/50 outline-none text-sm sm:text-base" />
          <input type="text" placeholder="Symptoms (optional)" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-3 border border-[#B0C4DE] rounded-lg focus:border-[#3A6D9A] focus:ring-2 focus:ring-[#B0C4DE]/50 outline-none text-sm sm:text-base placeholder-gray-500" />
        </div>

        {message && <p className="text-center text-red-500 mt-3 text-sm sm:text-base">{message}</p>}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-5">
          {slots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            return (
              <button
                key={slot}
                onClick={() => !isBooked && setSelectedTime(slot)}
                disabled={isBooked}
                className={`p-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 ${
                  isBooked
                    ? "bg-[#D3D3D3] text-gray-600 cursor-not-allowed"
                    : selectedTime === slot
                    ? "bg-[#3A6D9A] text-white shadow-md scale-105"
                    : "bg-[#E6EEF5] hover:bg-[#D7E3F4] text-[#000]"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-gradient-to-r from-[#3A6D9A] to-[#6A9FCB] hover:shadow-[0_0_20px_#B0C4DE] text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          Confirm Appointment
        </button>

        {appointment && (
          <div id="appointment-details" className="mt-6 bg-white/70 backdrop-blur-md p-5 rounded-xl border border-[#B0C4DE] shadow-inner text-sm sm:text-base relative transition-all duration-500 hover:shadow-[0_0_25px_#C7DAE8]">
            <h2 className="text-lg sm:text-xl font-semibold text-[#3A6D9A] mb-3 font-inter">Appointment Details</h2>
            <p><strong>Name:</strong> {appointment.name}</p>
            <p><strong>Phone:</strong> {appointment.phone}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Symptoms:</strong> {appointment.symptoms || "Not provided"}</p>

            <div id="download-message" style={{ display: "none", marginTop: "10px", color: "#3A6D9A", fontWeight: 500 }}>
              Please arrive 10 minutes earlier. Thank you!
            </div>

            <button
              onClick={handleDownload}
              className="mt-4 bg-[#B0C4DE] hover:bg-[#A1B7D1] text-black py-2 px-4 rounded-lg transition text-sm sm:text-base font-[Nunito]"
            >
              Download as JPG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
