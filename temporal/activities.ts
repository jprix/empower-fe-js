// activities.ts
import { uuid4 } from "@temporalio/workflow";

// Exporting the generateUUID function
export async function generateUUID(): Promise<string> {
    const UUID = uuid4();
    console.log(`Generated UUID in activity: ${UUID}`);
    return UUID;
}

// Exporting the sendEmail function
export async function sendEmail({ name, email, address, activityId }: { name: string; email: string; address: string; activityId: string }): Promise<void> {
    console.log(`Sending email to ${name} at ${email} for ${address} with activityId: ${activityId}`);
    // Your email sending logic here (e.g., using SendGrid API)
}

// Payment Process Activity (third activity)
// Payment Process Activity
export async function paymentProcess({ workflowId }: { workflowId: string }): Promise<void> {
    console.log(`Processing payment for workflow ID: ${workflowId}`);
    // Implement your payment processing logic here
}