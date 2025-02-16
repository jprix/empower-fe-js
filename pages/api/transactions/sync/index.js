// pages/api/createLinkToken.js
export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
    const { access_token } = req.body;
    console.log("Access Token: ", access_token);

    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Plaid credentials' });
    }

    try {
        const response = await fetch('https://sandbox.plaid.com/transactions/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                access_token: access_token,
                "count": 250,
                options: {
                    days_requested: 90,
                    include_original_description: true,

                }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error_message });
        }

        console.log("Accounts Data: ", data);
        res.status(200).json({ accounts: data.accounts });
    } catch (error) {
        console.error('Error creating Plaid link token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
