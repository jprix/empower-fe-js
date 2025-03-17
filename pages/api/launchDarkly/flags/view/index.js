export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const LD_API_KEY = process.env.LD_API_KEY; // No NEXT_PUBLIC_ since it's private
  const LD_PROJECT_KEY = process.env.LD_PROJECT_KEY;

  console.log("LD_API_KEY:", LD_API_KEY, LD_PROJECT_KEY);
  try {
    const response = await fetch(
      `https://app.launchdarkly.com/api/v2/flags/${LD_PROJECT_KEY}`,
      {
        headers: {
          Authorization: `${LD_API_KEY}`, // Ensure api- prefix
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`LaunchDarkly API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("LaunchDarkly API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
