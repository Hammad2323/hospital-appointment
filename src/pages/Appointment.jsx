import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function Appointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const appointmentsRef = collection(db, "appointments");

  // === Generate time slots ===
  const generateTimeSlots = (day) => {
    let slots = [];
    let startHour = 9;
    let endHour = 14; // 2 PM

    // Friday short hours (9 AM - 1 PM)
    if (day === 5) endHour = 13;

    const maxPatients = day === 5 ? 24 : 30;
    const slotCount = (endHour - startHour) * 6; // 6 slots per hour (10 mins)
    const total = Math.min(slotCount, maxPatients);

    for (let i = 0; i < total; i++) {
      const hour = Math.floor(i / 6) + startHour;
      const minute = (i % 6) * 10;
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(formattedTime);
    }
    return slots;
  };

  // === When user picks a date ===
  useEffect(() => {
    if (!date) return;
    const selected = new Date(date);
    const day = selected.getDay();

    if (day === 0) {
      setAvailableSlots([]);
      return;
    }

    const slots = generateTimeSlots(day);

    const fetchData = async () => {
      const q = query(appointmentsRef, where("date", "==", date));
      const snapshot = await getDocs(q);
      const bookedTimes = snapshot.docs.map((doc) => doc.data().time);
      const remaining = slots.filter((t) => !bookedTimes.includes(t));
      setAvailableSlots(remaining);
    };

    fetchData();
  }, [date]);

  // === Submit Appointment ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const selectedDay = new Date(date).getDay();
    if (selectedDay === 0) {
      alert("Clinic is closed on Sunday.");
      return;
    }

    try {
      await addDoc(appointmentsRef, {
        name,
        phone,
        date,
        time,
        createdAt: new Date(),
      });
      setSuccessMsg("✅ Appointment booked successfully!");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setAvailableSlots([]);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 font-[Poppins]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Book Appointment
        </h2>

        {successMsg && (
          <p className="text-green-600 text-center font-medium mb-4">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {availableSlots.length > 0 ? (
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          ) : date ? (
            <p className="text-center text-red-500 text-sm">
              {new Date(date).getDay() === 0
                ? "Closed on Sunday"
                : "No slots available for this date"}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
