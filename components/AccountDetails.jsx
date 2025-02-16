import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon from MUI

export default function AccountDetails({ account, accessToken, onClose }) {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/transactions/sync', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        access_token: accessToken,
                        account_id: account.account_id,
                    }),
                });

                const data = await response.json();
                // Filter transactions over $100
                const filteredTransactions = data.added.filter(transaction => transaction.amount > 100);

                setTransactions(filteredTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [account, accessToken]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" className="bg-white">
                <img
                    src="/empower-horizontal-logo.svg"
                    alt="Loading spinner"
                    className="w-40 h-40 animate-pulse"
                />
            </Box>
        );
    }

    return (
        <Box className="relative p-4 bg-white rounded-md shadow-md">
            {/* Close button placed at the top of the box */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'var(--color-primary)', // Use the primary color for the close icon
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Typography and other content */}
            <Box mt={5}> {/* Adding margin-top to push the content below the close button */}
                <Typography variant="h6" className="text-lg font-bold text-primary mb-4">
                    Transactions Over $100 in the Last 90 Days
                </Typography>
                {transactions.length > 0 ? (
                    <List>
                        {transactions.map((transaction) => (
                            <ListItem key={transaction.transaction_id}>
                                <ListItemText
                                    primary={transaction.name}
                                    secondary={`Amount: $${transaction.amount.toFixed(2)} | Date: ${transaction.date}`}
                                    className="text-secondary"
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography className="text-gray-600">No transactions over $100 in the last 90 days.</Typography>
                )}
            </Box>
        </Box>
    );
}
