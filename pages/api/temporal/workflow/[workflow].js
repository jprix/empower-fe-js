import { WorkflowClient } from '@temporalio/client';
import { userClickedLinkInEmail } from '../../../../temporal/workflows'; // The signal definition

export default async function handler(req, res) {
    const { workflow } = req.query; // Updated to access 'workflow' key in query

    const workflowId = workflow; // Now assign the correct value from 'workflow'

    console.log('API workflowId:', workflowId);

    if (!workflowId) {
        res.status(400).json({ error: 'Workflow ID is required' });
        return;
    }

    if (req.method === 'GET') {
        try {
            console.log(`Received signal request for workflowId: ${workflowId}`);

            // Initialize the Temporal client
            const client = new WorkflowClient();

            // Get a handle for the existing workflow using its workflowId
            const handle = client.getHandle(workflowId);

            // Log the signal to verify it's being invoked
            console.log(`Sending signal to workflow ID: ${workflowId}`);

            // Send the signal to the workflow that the user has clicked the email link
            await handle.signal(userClickedLinkInEmail);

            // Log success
            console.log(`Signal sent to workflow ID: ${workflowId}`);

            res.status(200).json({ message: `Workflow with ID ${workflowId} signaled successfully.` });
        } catch (error) {
            console.error('Error signaling workflow:', error);
            res.status(500).json({ error: 'Workflow signal failed.', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
