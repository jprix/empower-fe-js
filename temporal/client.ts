import { WorkflowClient } from '@temporalio/client';
import { sendVerificationEmail } from './workflows';

export async function startVerificationWorkflow(name: string, email: string, address: string, userId: string) {
    const client = new WorkflowClient();

    // Start the workflow and pass in the arguments
    const handle = await client.start(sendVerificationEmail, {
        taskQueue: 'verificationQueue', // This task queue should match your worker's task queue
        args: [{ name, email, address }], // Arguments for the workflow
        workflowId: `email-verification-${Date.now()}`, // Unique ID for the workflow
        searchAttributes: {
            'CustomTextField': [`userId:${userId}`, `email:${email}`], // Add searchable attributes like userId and email
            'CustomStringField': [`name:${name}`, `address:${address}`], // Storing name and address as well
        },
    });

    console.log(`Started workflow with ID: ${handle.workflowId} for userId: ${userId}`);
    return handle;
}
