// pages/api/createLinkToken.js

import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
  const clientUserId = uuidv4();

  if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Missing Plaid credentials' });
  }

  try {
    const response = await fetch('https://sandbox.plaid.com/link/token/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_CLIENT_SECRET,
        user: { client_user_id: clientUserId },
        client_name: 'Proof of Fund',
        products: ['auth', 'transactions', 'assets', 'identity', 'investments'],
        transactions: {
          "days_requested": 90
        },
        country_codes: ['US'],
        language: 'en',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error_message });
    }

    console.log("Link token from backend: ", data);
    res.status(200).json({ link_token: data.link_token });
  } catch (error) {
    console.error('Error creating Plaid link token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
