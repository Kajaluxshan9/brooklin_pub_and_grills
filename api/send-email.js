import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { name, email, phone, message, category } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Category is required." });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required." });
    }

    // Category mapping for display
    const categoryLabels = {
      "seat-reservation": "Seat Reservation for Dining",
      "party-hall": "Party Hall Reservation",
      "general-info": "General Information",
      feedback: "Feedback",
    };

    const categoryLabel = categoryLabels[category] || category;

    try {
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransporter({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify transporter configuration
      await transporter.verify();

      // Email options with better formatting and BCC
      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        bcc: "subathran2000@gmail.com", 
        replyTo: email,
        subject: `New Contact Form Submission - ${categoryLabel} from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Category:</strong> ${categoryLabel}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        text: `Category: ${categoryLabel}\nName: ${name}\nEmail: ${email}\nPhone: ${
          phone || "Not provided"
        }\nMessage: ${message}`,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);

      res.status(200).json({
        message: "Email sent successfully! We'll get back to you soon.",
        success: true,
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Provide more specific error messages
      let errorMessage = "Failed to send email. Please try again later.";
      if (error.code === "EAUTH") {
        errorMessage = "Email authentication failed. Please contact support.";
      } else if (error.code === "ECONNECTION") {
        errorMessage =
          "Connection error. Please check your internet connection.";
      }

      res.status(500).json({
        message: errorMessage,
        success: false,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
