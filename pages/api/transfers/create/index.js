import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
    const { access_token, account_id, authorization_id } = req.body;


    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Plaid credentials' });
    }

    // if (!access_token, !account_id, authorization_id) {
    //     return res.status(400).json({ error: 'Missing body data' });
    // }

    try {
        console.log('creating request');
        const response = await fetch('https://sandbox.plaid.com/transfer/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                access_token,
                authorization_id,
                account_id,
                amount: "5.00",
                description: "POF Payment",
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error creating transfer:', data.error_message);
            return res.status(response.status).json({ error: data.error_message });
        }

        console.log("transfer Data: ", data);
        res.status(200).json(data);

    } catch (error) {
        console.error('Error creating Plaid transfer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
