/**
 * Mock contact form API route.
 * In production, replace the handler body with real email/CRM integration.
 */
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, debtAmount, message } = req.body;

  // Basic validation
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ message: "Email is required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Message is required." });
  }

  // Log submission (replace with real integration: SendGrid, Salesforce, HubSpot, etc.)
  console.log("📬 Contact form submission:", {
    name,
    email,
    phone: phone || "not provided",
    debtAmount: debtAmount || "not provided",
    message,
    timestamp: new Date().toISOString(),
  });

  // Simulate a slight delay for realism
  return res.status(200).json({
    success: true,
    message: "Your message has been received. A specialist will be in touch within one business day.",
  });
}
