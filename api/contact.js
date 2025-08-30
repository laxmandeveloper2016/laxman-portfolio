import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse body (for urlencoded forms)
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => {
        data += chunk.toString();
      });
      req.on("end", () => {
        const params = new URLSearchParams(data);
        resolve(Object.fromEntries(params));
      });
      req.on("error", err => reject(err));
    });

    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "laxman.developer2016@gmail.com",
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

    return res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error in contact function:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
