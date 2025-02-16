// pages/api/tokensLinkToken.js
export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env; 
    console.log("Plaid client id: ", PLAID_CLIENT_ID, "Plaid client secret: ", PLAID_CLIENT_SECRET);
    const { public_token } = req.body;
    
    if (!PLAID_CLIENT_ID || !PLAID_CLIENT_SECRET) {
      return res.status(500).json({ error: 'Missing Plaid credentials' });
    }
  
    try {
      const response = await fetch('https://sandbox.plaid.com/item/public_token/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: PLAID_CLIENT_ID,   
          secret: PLAID_CLIENT_SECRET,  
          public_token: public_token,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({ error: data.error_message });
      }
  
      console.log("Access token from backend: ", data);
      res.status(200).json({ access_token: data.access_token });
    } catch (error) {
      console.error('Error exchanging Plaid link token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  