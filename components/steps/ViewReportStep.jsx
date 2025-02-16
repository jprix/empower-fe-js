import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';

export default function ViewReportStep() {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { connectedAccounts } = useConnectedAccounts();

    useEffect(() => {
        const delayFetchReport = setTimeout(() => {
            const fetchReport = async () => {
                try {
                    const assetReportToken = connectedAccounts[0]?.report?.asset_report_token;

                    if (!assetReportToken) {
                        console.error('No asset report token found.');
                        return;
                    }

                    const reportResponse = await fetch('/api/reports/view', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ asset_report_token: assetReportToken }),
                    });

                    const data = await reportResponse.json();
                    setReportData(data);
                } catch (error) {
                    console.error('Error fetching report:', error);
                } finally {
                    setLoading(false);
                }
            };

            if (connectedAccounts.length > 0 && connectedAccounts[0]?.report?.asset_report_token) {
                fetchReport();
            }
        }, 1000); // 10-second delay

        return () => clearTimeout(delayFetchReport); // Clean up the timeout if the component unmounts
    }, [connectedAccounts]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" className="bg-white">
                    <img
                        src="/empower-horizontal-logo.svg"
                        alt="Loading spinner"
                        className="w-40 h-40 animate-pulse"
                    />
                </Box>
                <Typography sx={{ mt: 2 }}>Loading Report...</Typography>
            </Box>
        );
    }

    if (!reportData) {
        return (
            <Typography variant="h6" color="error" align="center">
                No report data available.
            </Typography>
        );
    }

    const { report } = reportData;

    // Calculate total balances
    const totalAvailableBalance = report?.items
        ?.flatMap(item => item.accounts)
        ?.reduce((sum, account) => sum + (account.balances.available || 0), 0);

    const totalCurrentBalance = report?.items
        ?.flatMap(item => item.accounts)
        ?.reduce((sum, account) => sum + (account.balances.current || 0), 0);

    // Extract bank information from the connectedAccounts array
    const bankName = connectedAccounts[0]?.institution?.name || 'N/A';
    const verificationDate = new Date(report?.date_generated).toLocaleDateString() || 'N/A';
    const bankAddress = '123 Financial Avenue, New York, NY, 10001'; // Placeholder

    return (
        <Box sx={{ mt: 4, px: 4 }}>
            <Typography variant="h4" align='center' sx={{ color: '#0066cc', fontWeight: 'bold', mb: 4 }}>
                Proof of Funds Report
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
                        Details
                    </Typography>
                    <Typography variant="body1">
                        <strong>Report ID:</strong> {report?.asset_report_id || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Client Report ID:</strong> {report?.client_report_id || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Date Generated:</strong> {report?.date_generated ? new Date(report?.date_generated).toLocaleString() : 'N/A'}
                    </Typography>
                </Box>

                {/* User information on the right */}
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
                        User Information</Typography>
                    <Typography variant="body1">
                        <strong>Name:</strong> {report?.user?.first_name} {report?.user?.last_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {report?.user?.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone Number:</strong> {report?.user?.phone_number}
                    </Typography>
                    <Typography variant="body1">
                        <strong>SSN:</strong> {report?.user?.ssn}
                    </Typography>
                </Box>
            </Box>

            {/* Total balances */}
            <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#f0f8ff' }}>
                <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
                    Total Available Balance: ${totalAvailableBalance?.toLocaleString() || '0'}
                </Typography>
                <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
                    Total Current Balance: ${totalCurrentBalance?.toLocaleString() || '0'}
                </Typography>
            </Box>

            {/* Account Summary */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Account(s) Summary:</Typography>
                {report?.items?.map((item, index) => {
                    // Match institution name from report item with connectedAccounts to get the logo
                    let matchedAccount = connectedAccounts.find(
                        (account) => account.institution.name === item.institution_name
                    );
                    let institutionLogo = matchedAccount?.institution?.logo;

                    return (
                        <Box key={index} sx={{ mt: 4 }}>
                            {/* Display the logo */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {institutionLogo && (
                                    <img
                                        src={`data:image/png;base64,${institutionLogo}`}
                                        alt={`${item.institution_name} logo`}
                                        style={{
                                            width: '40px',
                                            height: 'auto',
                                            marginRight: '10px', // Add spacing between logo and text
                                            borderRadius: '8px', // Add slight rounding to logo
                                        }}
                                    />
                                )}
                                <Typography variant="body1" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
                                    <strong>Institution:</strong> {item.institution_name || 'N/A'}
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ mt: 2 }}>
                                <strong>Bank's Name:</strong> {item.institution_name || 'N/A'}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Bank's Address:</strong> {bankAddress}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Verification Date:</strong> {verificationDate}
                            </Typography>

                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Account Name</TableCell>
                                            <TableCell>Available Balance</TableCell>
                                            <TableCell>Current Balance</TableCell>
                                            <TableCell>Account Type</TableCell>
                                            <TableCell>Mask</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {item.accounts.map((account, accIndex) => (
                                            <TableRow key={accIndex}>
                                                <TableCell>{account.name}</TableCell>
                                                <TableCell>${account.balances.available?.toLocaleString() || 'N/A'}</TableCell>
                                                <TableCell>${account.balances.current?.toLocaleString() || 'N/A'}</TableCell>
                                                <TableCell>{account.type}</TableCell>
                                                <TableCell>{account.mask}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    );
                })}
            </Box>


            {/* Report summary section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold' }} > Report Summary</Typography>
                <Typography variant="body1">
                    <strong>Days Requested:</strong> {report?.days_requested || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Total Institutions:</strong> {report?.items?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Authorized Bank Employee Signature:</strong> John Doe (Notary)
                </Typography>
            </Box>
        </Box >
    );
}
