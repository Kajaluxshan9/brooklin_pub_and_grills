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
      // Log body for debugging; remove or reduce logging in production
      console.log(
        "/order-onlinegf webhook received:",
        JSON.stringify(req.body)
      );

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
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Order webhook</title>
          <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:48px;color:#111}a{color:#0366d6}</style>
        </head>
        <body>
          <h1>Order webhook endpoint</h1>
          <p>This endpoint is a webhook receiver intended for <strong>POST</strong> requests only.</p>
          <p>If you arrived here in a browser, go back to the <a href="/">homepage</a> or use the site UI to place an order.</p>
          <p>External services should POST JSON to this URL. The server will respond with <code>200</code> on successful receipt.</p>
        </body>
      </html>
    `);
    return;
  }

  // Method not allowed for any other methods
  res.setHeader("Allow", ["POST", "OPTIONS", "GET"]);
  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
