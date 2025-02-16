import { NativeConnection, Worker } from '@temporalio/worker';  // Use NativeConnection for the server connection
import * as activities from './activities';  // Import your activities

async function runWorker() {
    console.log('Worker is starting...');

    // Step 1: Establish a connection to the Temporal server
    const connection = await NativeConnection.connect({
        address: 'localhost:7233',  // Ensure Temporal server is running on localhost:7233
        // If you're using TLS, you would configure that here
    });

    // Step 2: Create the worker and register workflows and activities
    const worker = await Worker.create({
        connection,  // Use the connection established above
        namespace: 'default',  // Specify the namespace (default is usually fine unless you have custom namespaces)
        workflowsPath: require.resolve('./workflows'),  // Point to the workflows file
        activities,  // Pass the imported activities
        taskQueue: 'verificationQueue',  // Task queue name needs to match with the client
    });

    console.log('Worker created, waiting for tasks...');

    // Step 3: Run the worker to start processing tasks
    await worker.run();
    console.log('Worker is processing tasks...');
}

// Catch and handle errors that may arise during the worker's execution
runWorker().catch((err) => {
    console.error('Worker failed:', err);
    process.exit(1);  // Exit with failure code on error
});
