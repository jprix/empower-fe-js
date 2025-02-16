// API route to fetch user identity
export default async function handler(req, res) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;
    const { access_token } = req.body;

    try {
        const response = await fetch('https://sandbox.plaid.com/item/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: PLAID_CLIENT_ID,
                secret: PLAID_CLIENT_SECRET,
                access_token: access_token,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Account successfully removed:', data);
        } else {
            console.error('Error removing account:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
