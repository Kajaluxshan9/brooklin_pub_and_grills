// Test script to verify environment variables
console.log("Environment Variables Check:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set" : "Not set");
console.log(
  "RECIPIENT_EMAIL:",
  process.env.RECIPIENT_EMAIL ? "Set" : "Not set"
);

export default function handler(req, res) {
  res.status(200).json({
    emailUser: process.env.EMAIL_USER ? "Set" : "Not set",
    emailPass: process.env.EMAIL_PASS ? "Set" : "Not set",
    recipientEmail: process.env.RECIPIENT_EMAIL ? "Set" : "Not set",
  });
}
