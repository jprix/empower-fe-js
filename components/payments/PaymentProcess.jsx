import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Box, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';
import { useUser } from '../../context/UserContext';

export default function PaymentProcess({ onClose }) {
    const { connectedAccounts } = useConnectedAccounts();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState('');
    console.log('PP Connected Accounts:', connectedAccounts);

    const accessToken = connectedAccounts[0]?.access_token;
    const accountId = connectedAccounts[0]?.accounts[0]?.id;
    const legalName = user?.name;
    const handleAccountChange = (event) => {
        setSelectedAccountId(event.target.value);
    };


    const handlePayment = async () => {
        setLoading(true);

        try {

            if (!accessToken || !accountId || !legalName) {
                console.error("Missing required data for transfer authorization.");
                setLoading(false);
                return;
            }

            // Make API call to create a transfer authorization
            const authorizationResponse = await fetch('/api/transfers/authorization/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token: accessToken, // from connected account
                    account_id: accountId, // selected account ID
                    legal_name: legalName, // user's legal name
                }),
            });

            const authorizationData = await authorizationResponse.json();
            console.log('Authorization Data:', authorizationData?.authorization?.id);

            if (authorizationData?.authorization?.id) {
                const transferResponse = await fetch('/api/transfers/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        authorization_id: authorizationData?.authorization?.id,
                        access_token: accessToken,
                        account_id: accountId,
                        amount: "5.00",
                    }),
                });

                const transferData = await transferResponse.json();
                console.log('Transfer Response:', transferData);

                if (transferData?.transfer?.id) {
                    setPaymentSuccess(true);
                }
            }
        } catch (error) {
            console.error('Payment process error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" position="relative">
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>

            {loading ? (
                <>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" className="bg-white">
                        <img
                            src="/empower-horizontal-logo.svg"
                            alt="Loading spinner"
                            className="w-40 h-40 animate-pulse"
                        />
                    </Box>
                    <Typography sx={{ mt: 2 }}>Processing Payment...</Typography>
                </>
            ) : paymentSuccess ? (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Payment Successful!
                    </Typography>
                    <Button variant="contained" sx={{
                        mt: 4, backgroundColor: 'var(--color-tertiary)', // Use Tailwind's tertiary color
                        '&:hover': {
                            backgroundColor: 'var(--color-tertiary-dark)', // Optional: Define a darker shade for hover
                        },
                    }} onClick={onClose}>
                        Close
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Payment Preview
                    </Typography>

                    {/* Payment Preview Card */}
                    <Box
                        sx={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            mb: 3,
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            textAlign: 'left'
                        }}
                    >
                        <Typography variant="body1">
                            <strong>Payee:</strong> {user?.name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Amount:</strong> $5.00
                        </Typography>
                        <Typography variant="body1">
                            <strong>Linked Account Name:</strong> {connectedAccounts[0]?.accounts[0]?.name} {/* Replace with the actual linked account name */}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Linked Account ID:</strong> {accountId} {/* Use actual accountId */}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            You are about to pay $5.00 from your linked account for a copy of your Proof of Funds report.  You will also be emailed a copy.  Please note we do not store any data.
                        </Typography>
                    </Box>
                    {connectedAccounts.length > 0 && (
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <Typography>Select an account to pay from:</Typography>
                            <Select
                                value={selectedAccountId}
                                onChange={handleAccountChange}
                                displayEmpty
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Select Account
                                </MenuItem>
                                {connectedAccounts.map((account) => (
                                    <MenuItem key={account.account_id} value={account.account_id} onChange={handleAccountChange}>
                                        {account.institution.name} - {account.accounts[0].name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {selectedAccountId !== '' && (<Button variant="contained" sx={{
                        backgroundColor: 'var(--color-tertiary)',
                        '&:hover': {
                            backgroundColor: 'var(--color-tertiary-dark)',
                        },
                    }} onClick={handlePayment}>
                        Pay
                    </Button>)}
                </>

            )}
        </Box>
    );
}
