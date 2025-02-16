import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const Verifications = () => {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch verifications from the API
        const fetchVerifications = async () => {
            try {
                const response = await fetch('/api/verifications?userId=33fdc8d5-ca58-4f13-b35a-5f4959594e24', {
                    headers: {
                        'Cache-Control': 'no-store', // Prevent browser caching
                    },
                });
                const data = await response.json(); // Parse response as JSON
                setVerifications(data);
            } catch (error) {
                console.error('Error fetching verifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVerifications();

    }, []);

    return (
        <TableContainer component={Paper} className="bg-white">
            <Typography variant="h6" sx={{ color: 'var(--color-primary)', padding: '20px' }}>
                Verification List
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {verifications.length > 0 ? (
                            verifications.map((verification, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ backgroundColor: index % 2 === 0 ? 'rgba(39, 170, 225, 0.2)' : 'transparent' }}
                                >
                                    <TableCell>{new Date(verification.startTime).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {verification.searchAttributes?.CustomTextField?.[1]
                                            ? verification.searchAttributes.CustomTextField[1].substring(6)
                                            : 'No email'}
                                    </TableCell>
                                    <TableCell>{verification.status?.name || 'Unknown'}</TableCell>
                                    <TableCell>{verification.searchAttributes?.CustomStringField?.[0].substring(5) || 'No Name'}</TableCell>
                                    <TableCell>{verification.searchAttributes?.CustomStringField?.[1].substring(8) || 'No Property'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
                                            onClick={() => alert('Action clicked!')}
                                        >
                                            Action
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No verifications found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default Verifications;
