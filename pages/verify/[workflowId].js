// /pages/verify/[workflowId].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Verify = () => {
    const router = useRouter();
    const { workflowId } = router.query; // Extract the workflowId from the URL
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        const verifyWorkflow = async () => {

            console.log('Calling API to verify workflow:', workflowId);

            //if (!workflowId) return; // Exit if workflowId is undefined or empty


            try {
                const response = await fetch(`/api/temporal/workflow/${workflowId}`);
                const data = await response.json();

                if (response.ok) {
                    console.log('API response:', data);
                    setStatus(`Verification for workflow ID: ${workflowId} was successful!`);
                } else {
                    console.error('Error from API:', data);
                    setStatus('Error occurred while verifying.');
                }
            } catch (error) {
                console.error('Error:', error);
                setStatus('Error occurred during the verification process.');
            }
        };

        if (router.isReady) {
            verifyWorkflow(); // Trigger verification once router is ready
        }
    }, [workflowId, router.isReady]); // Re-run when workflowId is defined and router is ready

    return (
        <div>
            <h1>Verifying your details...</h1>
            <p>{status}</p>
        </div>
    );
};

export default Verify;
