import { fetchDynamicJWTToken } from '../../../lib/dynamicAuthToken';

export default async function handler(req, res) {
    //const token = await fetchDynamicJWTToken();
    const { userId } = req.query;
    const { DYNAMIC_API_KEY } = process.env;

    console.log('API userId:', userId, 'token:', DYNAMIC_API_KEY);

    if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
    }

    if (req.method === 'GET') {
        try {

            const response = await fetch(`https://app.dynamicauth.com/api/v0/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DYNAMIC_API_KEY}`, // Use inbound token from the request header
                },
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the error message
                console.error('Error fetching userId:', errorText);
                res.status(response.status).json({ error: 'Failed to fetch userId', details: errorText });
                return;
            }

            const data = await response.json();
            res.status(200).json(data);

        } catch (error) {
            console.error('Error signaling userId:', error);
            res.status(500).json({ error: 'userId fetch failed.', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
