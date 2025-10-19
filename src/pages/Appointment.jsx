import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import html2canvas from "html2canvas";

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

      const newAppointment = {
        name,
        phone,
        symptoms,
        date,
        time: selectedTime,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "appointments"), newAppointment);
      localStorage.setItem("appointment", JSON.stringify(newAppointment));
      setAppointment(newAppointment);

      // === Send Email ===
      try {
        await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAppointment),
        });
      } catch (err) {
        console.warn("⚠️ Email server not running (ignored).");
      }

      alert("✅ Appointment confirmed! Email sent to clinic.");
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
      if (appTime < now) {
        setMessage("⚠️ Your appointment has passed. Please book a new one.");
      }
    }
  }, []);

  const handleDownload = async () => {
    const element = document.getElementById("appointment-details");
    const hiddenMessage = document.getElementById("download-message");
    hiddenMessage.style.display = "block"; // show only during capture

    const canvas = await html2canvas(element);
    hiddenMessage.style.display = "none"; // hide it back

    const link = document.createElement("a");
    link.download = "appointment.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  return (
    <div className="max-w-md sm:max-w-lg mx-auto mt-8 sm:mt-12 bg-gradient-to-b from-green-50 to-white shadow-xl rounded-3xl p-5 sm:p-8 font-[Poppins] border border-green-200">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-green-700 mb-6">
        Book Your Appointment
      </h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
        />

        <input
          type="tel"
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
        />

        <input
          type="text"
          placeholder="Symptoms (optional)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full p-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
        />
      </div>

      {message && <p className="text-center text-red-500 mt-3 text-sm sm:text-base">{message}</p>}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
        {slots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          return (
            <button
              key={slot}
              onClick={() => !isBooked && setSelectedTime(slot)}
              disabled={isBooked}
              className={`p-2 text-xs sm:text-sm rounded-lg font-medium transition ${
                isBooked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selectedTime === slot
                  ? "bg-green-600 text-white"
                  : "bg-green-100 hover:bg-green-200 text-green-700"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleConfirm}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition text-sm sm:text-base"
      >
        Confirm Appointment
      </button>

      {appointment && (
        <div
          id="appointment-details"
          className="mt-6 bg-green-50 p-4 rounded-xl border border-green-200 shadow-inner text-sm sm:text-base relative"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
            Appointment Details
          </h2>
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Symptoms:</strong> {appointment.symptoms || "Not provided"}</p>

          {/* Hidden message for download only */}
          <div id="download-message" style={{ display: "none", marginTop: "10px", color: "#166534", fontWeight: 500 }}>
            Please arrive 10 minutes earlier. Thank you!
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition text-sm sm:text-base"
          >
            Download as JPG
          </button>
        </div>
      )}
    </div>
  );
}
