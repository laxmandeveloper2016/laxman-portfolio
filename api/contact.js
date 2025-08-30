import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Setup email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "laxman.developer2016@gmail.com", // Your inbox
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Email could not be sent", details: error.message });
  }
}
