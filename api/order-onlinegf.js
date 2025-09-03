// Lightweight webhook receiver for external order service (East Serve)
// Accepts POST and responds 200 so the external system stops retrying 405.
// If you need to process or forward the payload, add logic inside the POST block.
export default async function handler(req, res) {
  const ALLOWED_ORIGIN =
    process.env.ALLOWED_ORIGIN || "https://brooklinpub.com";
  const requestOrigin = req.headers.origin;
  const allowOrigin =
    requestOrigin === ALLOWED_ORIGIN ? requestOrigin : ALLOWED_ORIGIN;

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    // Preflight
    res.status(204).end();
    return;
  }

  if (req.method === "POST") {
    try {
      // Request body received. Detailed logging removed to avoid capturing PII.

      // Basic acknowledgement to stop retries. If you need to forward the
      // payload (e.g., send email or place order), add that logic here.
      res.status(200).json({ message: "Received" });
    } catch (err) {
      console.error("Error handling /order-onlinegf webhook:", err);
      res.status(500).json({ message: "Server error" });
    }
    return;
  }

  // Provide a friendly response for browser GETs and keep POST/OPTIONS behavior unchanged.
  if (req.method === "GET") {
    // Redirect browser GETs back to the homepage.
    // Keep CORS and other headers already set above.
    res.setHeader("Location", "/");
    res.status(302).end();
    return;
  }

  // Method not allowed for any other methods
  res.setHeader("Allow", ["POST", "OPTIONS", "GET"]);
  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
