import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Modal } from '@mui/material';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';
import { useUser } from '../../context/UserContext';
import AccountDetails from '../AccountDetails'; // Import the AccountDetails component


export default function AccountBalanceStep({ onNext }) {
  const { connectedAccounts, updateConnectedAccount } = useConnectedAccounts();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccessToken, setSelectedAccessToken] = useState(null); // State to hold access_token
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        setLoading(true);

        // Loop through each connected account
        for (const account of connectedAccounts) {
          const accessToken = account?.access_token;
          console.log('Access Token grabbed:', accessToken);

          // Step 2: Call /api/accounts to retrieve account details using the access_token
          const accountsResponse = await fetch('/api/accounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: accessToken,
            }),
          });

          const accountsData = await accountsResponse.json();

          if (accountsData?.accounts && Array.isArray(accountsData.accounts)) {
            // Update connected account with fetched balances
            console.log('Updating connected account with balances:', accountsData.accounts);
            updateConnectedAccount(account.link_session_id, { balances: accountsData.accounts });
          } else {
            console.error('Unexpected accounts data:', accountsData);
          }
        }
      } catch (error) {
        console.error('Error fetching account balances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountBalances();
  }, []);

  const handleOpen = (account, accessToken) => {
    console.log('Selected Account:', account, 'Access Token:', accessToken);
    setSelectedAccount(account);
    setSelectedAccessToken(accessToken);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedAccount(null);
  };
  return (
    <Box sx={{ p: 4 }}>


      {/* Main report details */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Summary
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading account balances...</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 4, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead sx={{ background: 'linear-gradient(135deg, #ccffff, #0066cc)', color: 'white' }}>
                <TableRow>
                  <TableCell><strong>Account Name</strong></TableCell>
                  <TableCell><strong>Available Balance</strong></TableCell>
                  <TableCell><strong>Current Balance</strong></TableCell>
                  <TableCell><strong>Account Type</strong></TableCell>
                  <TableCell><strong>Account Subtype</strong></TableCell>
                  <TableCell>Details</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {connectedAccounts.map((account) =>
                  account.balances?.map((acc) => (
                    <TableRow key={acc.account_id}>
                      <TableCell>{acc.name}</TableCell>
                      <TableCell>${acc.balances?.available?.toLocaleString() || 'N/A'}</TableCell>
                      <TableCell>${acc.balances?.current?.toLocaleString() || 'N/A'}</TableCell>
                      <TableCell>{acc.type}</TableCell>
                      <TableCell>{acc.subtype}</TableCell>
                      <TableCell>
                        <Button variant="outlined" sx={{
                          backgroundColor: 'var(--color-tertiary)', // Use Tailwind's tertiary color
                          '&:hover': {
                            backgroundColor: 'var(--color-tertiary-dark)', // Optional: Define a darker shade for hover
                          },
                        }} onClick={() => handleOpen(acc, account?.access_token)}>
                          View Details
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}


      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, p: 4, margin: 'auto', mt: '10%' }}>
          {selectedAccount && (
            <AccountDetails account={selectedAccount} accessToken={selectedAccessToken} />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
