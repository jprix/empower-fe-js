export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;

    // Validate Plaid credentials
    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Plaid credentials' });
    }

    // Extract the asset report token from the request body
    const { asset_report_token } = req.body; // Ensure this matches the structure of your request

    // Check if asset_report_token is provided
    if (!asset_report_token || typeof asset_report_token !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing asset report token' });
    }

    console.log("Asset report token received:", asset_report_token);

    try {
        // Make the API call to Plaid to fetch the asset report
        const response = await fetch('https://sandbox.plaid.com/asset_report/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                asset_report_token: asset_report_token, // The token is sent here
                include_insights: true, // Include insights in the report if needed
            }),
        });

        const data = await response.json();

        // Handle Plaid response and error handling
        if (!response.ok) {
            console.error('Error fetching report:', data.error_message);
            return res.status(response.status).json({ error: data.error_message });
        }

        // Log the successfully received report data
        console.log("Asset Report Data: ", data);
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching asset report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
