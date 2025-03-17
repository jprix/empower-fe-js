export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const LD_API_KEY = process.env.LD_API_KEY; // Not exposed to frontend
  const LD_PROJECT_KEY = process.env.LD_PROJECT_KEY;
  const flagKey = req.body.flagKey;
  const body = req.body;

  try {
    const response = await fetch(
      `https://app.launchdarkly.com/api/v2/flags/${LD_PROJECT_KEY}/${flagKey}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${LD_API_KEY}`, // ✅ Secure API key usage
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patch: [
            {
              op: "replace",
              path: body.path,
              value: body.value,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return res.status(200).json(data);
  } catch (error) {
    console.error("LaunchDarkly Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
