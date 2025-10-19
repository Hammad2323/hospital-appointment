// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Email route (must match your frontend call)
app.post("/send-email", async (req, res) => {
  const { name, phone, symptoms, date, time } = req.body;

  try {
    // Configure transporter using Gmail + app password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Clinic Appointment" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `New Appointment from ${name}`,
      html: `
        <h2>🩺 New Appointment Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Symptoms:</strong> ${symptoms || "Not provided"}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// ✅ Optional: check route for browser test
app.get("/", (req, res) => {
  res.send("✅ Email API server is running...");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Email server running at http://localhost:${PORT}`)
);
