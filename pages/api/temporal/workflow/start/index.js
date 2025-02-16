// pages/api/verification.ts
import { startVerificationWorkflow } from '../../../../../temporal/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, address, userId } = req.body;

        if (!name || !email || !address || !userId) {
            return res.status(400).json({ error: 'Name, email, address, and userId are required' });
        }

        try {
            const handle = await startVerificationWorkflow(name, email, address, userId);
            return res.status(200).json({ runId: handle.workflowId }); // Return workflowId for success
        } catch (error) {
            console.error('Failed to start workflow:', error);
            return res.status(500).json({ error: 'Failed to start workflow' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
