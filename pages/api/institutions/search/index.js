// pages/api/createLinkToken.js
export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
    const { access_token } = req.body;

    const { name } = req.query;

    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Plaid credentials' });
    }

    try {
        const response = await fetch('https://sandbox.plaid.com/institutions/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                access_token: access_token,
                query: name,
                country_codes: ['US'],
                options: {
                    include_optional_metadata: true,
                },


            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error_message });
        }

        console.log("Instutitions Data: ", data);
        res.status(200).json({ Institutions: data.institutions });
    } catch (error) {
        console.error('Error creating Plaid link token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
