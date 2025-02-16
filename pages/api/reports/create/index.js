import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
    const { accountsTokens, user } = req.body;
    console.log('Accounts Tokens:', accountsTokens, 'User:', user, req.body);
    //const reportId = uuidv4();
    const nameParts = user?.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(-1).join(' ');

    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Plaid credentials' });
    }

    if (!accountsTokens || !Array.isArray(accountsTokens) || accountsTokens.length === 0) {
        return res.status(400).json({ error: 'No access tokens provided' });
    }

    try {
        const response = await fetch('https://sandbox.plaid.com/asset_report/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                access_tokens: accountsTokens,  // Pass the array of access tokens
                days_requested: 90,
                options: {
                    client_report_id: 'jsonPrix', // should become Temporal Id
                    webhook: 'https://proofoffunds.free.beeceptor.com',
                    user: {
                        client_user_id: user?.phoneNumber,
                        first_name: firstName,
                        last_name: lastName,
                        phone_number: user?.phoneNumber,
                        email: user?.email,
                    },
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error creating report:', data.error_message);
            return res.status(response.status).json({ error: data.error_message });
        }

        console.log("Report Data: ", data);
        res.status(200).json(data);

    } catch (error) {
        console.error('Error creating Plaid report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
