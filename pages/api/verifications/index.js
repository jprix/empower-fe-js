import { Connection, WorkflowClient } from '@temporalio/client';

export default async function handler(req, res) {
    // Function to get all workflows and manually filter by search attributes
    const getFilteredWorkflows = async ({ userId, email, name, address }) => {
        // Initialize the Temporal connection
        const connection = await Connection.connect();
        const client = new WorkflowClient({ connection });

        // Get an iterable of all workflows
        const workflowExecutions = client.list();
        const filteredExecutions = [];

        // Iterate over the async iterable to gather and filter workflow executions
        for await (const execution of workflowExecutions) {
            const customTextFields = execution.searchAttributes?.CustomTextField || [];

            // Check for the provided query parameters in the search attributes
            const matchesUserId = userId ? customTextFields.some(field => field.includes(`userId:${userId}`)) : true;
            console.log('matchesUserId', matchesUserId);


            // If all conditions match, add the workflow to the results
            if (matchesUserId) {
                console.log('execution matches');
                filteredExecutions.push(execution);
            }
        }

        return filteredExecutions;
    };

    // Handle only GET requests
    if (req.method === 'GET') {
        const { userId, email, name, address } = req.query; // Extract query params

        try {
            // Fetch workflows and filter based on the search attributes
            const workflows = await getFilteredWorkflows("33fdc8d5-ca58-4f13-b35a-5f4959594e24");

            // Return the workflows as a successful response
            return res.status(200).json(workflows);
        } catch (error) {
            console.error('Failed to query workflows:', error);
            return res.status(500).json({ error: 'Failed to query workflows', details: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
