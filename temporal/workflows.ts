import { defineSignal, proxyActivities, setHandler } from '@temporalio/workflow';

// Define the activities that this workflow will use
const { sendEmail, generateUUID, paymentProcess } = proxyActivities<typeof import('./activities')>({
    startToCloseTimeout: '1 minute',
});

// Define the signal for when the user clicks the email verification link
export const userClickedLinkInEmail = defineSignal('userClickedLinkInEmail');

// Workflow definition
export async function sendVerificationEmail(input: { name: string; email: string; address: string }): Promise<void> {
    // Generate a UUID via an activity
    const uuid = await generateUUID();

    // Send the verification email via an activity
    //this should call the activity execution !!!!   run this activity method.
    await sendEmail({
        name: input.name,
        email: input.email,
        address: input.address,
        activityId: uuid,
    });

    console.log('Waiting for user to click email verification link...');

    // Use a signal handler to pause the workflow and wait for the signal
    await new Promise<void>((resolve) => {
        setHandler(userClickedLinkInEmail, () => {
            console.log(`User clicked verification link for workflow ${uuid}`);
            resolve(); // Resolve the promise once the signal is received
            paymentProcess({ workflowId: uuid }); // Trigger the payment process activity
        });
    });

    console.log('Processing payment...');

    // Trigger the payment process activity after the signal is received
    await paymentProcess({ workflowId: uuid });

    console.log(`Verification and payment process completed for ${uuid}`);
}
