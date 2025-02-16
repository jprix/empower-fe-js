import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress, Modal } from '@mui/material';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';
import { useUser } from '../../context/UserContext';
import PaymentProcess from '../payments/PaymentProcess';  // Child component to handle payment

export default function CreateReportStep({ accountsTokens, onNext }) {
    const [loading, setLoading] = useState(false);
    const [reportCreated, setReportCreated] = useState(false);
    const { updateConnectedAccount, connectedAccounts } = useConnectedAccounts();
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const createReport = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/reports/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountsTokens,
                        user,
                    }),
                });

                const reportData = await response.json();
                console.log('Report Data:', reportData, reportData?.asset_report_id);

                if (reportData && reportData?.asset_report_id) {
                    // Assume we have the first connected account's link_session_id for simplicity
                    const link_session_id = connectedAccounts[0].link_session_id;

                    // Update the connected account with the new report object
                    const report = {
                        asset_report_id: reportData.asset_report_id,
                        asset_report_token: reportData.asset_report_token,
                        request_id: reportData.request_id,
                    };
                    console.log('Updating Report:', report);
                    updateConnectedAccount(link_session_id, { report }); // Always pass the link_session_id
                    setReportCreated(true);
                }
            } catch (error) {
                console.error('Error creating report:', error);
            } finally {
                setLoading(false);
            }
        };

        createReport();
    }, []);

    // Open and close modal handlers
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
            {loading ? (
                <>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" className="bg-white">
                        <img
                            src="/empower-horizontal-logo.svg"
                            alt="Loading spinner"
                            className="w-40 h-40 animate-pulse"
                        />
                    </Box>
                    <Typography sx={{ mt: 2 }}>Creating Report...</Typography>
                </>
            ) : reportCreated ? (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>Report Created</Typography>
                    <Button variant="contained" color="primary" sx={{
                        mt: 4, backgroundColor: 'var(--color-tertiary)',
                        '&:hover': {
                            backgroundColor: 'var(--color-tertiary-dark)',
                        },
                    }} onClick={handleOpen}>
                        Pay to View Report
                    </Button>
                </>
            ) : (
                <Typography sx={{ mt: 2 }}>No report created.</Typography>
            )}

            {/* Modal for payment process */}
            <Modal open={openModal} onClose={handleClose}>
                <Box sx={{ width: 400, p: 4, backgroundColor: 'white', borderRadius: 1, mx: 'auto', my: '20vh' }}>
                    <PaymentProcess onClose={handleClose} />
                </Box>
            </Modal>
        </Box>
    );
}
