import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Modal } from '@mui/material';
import PlaidLink from '../PlaidLink';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';
import AccountDetails from '../../components/AccountDetails';

export default function PlaidLinkStep({ onNext, openPlaidModal, setOpenPlaidModal }) {
  const { connectedAccounts, updateConnectedAccount } = useConnectedAccounts();
  const [accountDetails, setAccountDetails] = useState(null); // Selected account's details
  const [openModal, setOpenModal] = useState(false); // Modal visibility

  useEffect(() => {
    // Function to exchange tokens
    const exchangeTokensForAccounts = async () => {
      for (const account of connectedAccounts) {
        // Check if the account is missing an access_token
        if (!account.access_token) {
          try {
            const response = await fetch('/api/tokens/exchange', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ public_token: account.public_token }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Error exchanging token');
            }

            // Update the account with the access token in context
            updateConnectedAccount(account.link_session_id, {
              access_token: data.access_token,
            });
          } catch (err) {
            console.error(`Failed to exchange token for ${account.institution.name}:`, err.message);
          }
        }
      }
    };

    // Call the token exchange function if there are accounts
    if (connectedAccounts.length > 0) {
      exchangeTokensForAccounts();
    }
  }, [connectedAccounts, updateConnectedAccount]);

  const handlePlaidSuccess = async () => {
    setOpenPlaidModal(false);
  };

  const handleSeeDetails = (account) => {
    setAccountDetails(account); // Store selected account details
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    console.log('Closing Modal');
    setOpenModal(false); // Close modal
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'var(--color-primary)' }}>
        Link Accounts
      </Typography>

      {connectedAccounts.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {connectedAccounts.map((account, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  minHeight: 200,
                  flexBasis: {
                    xs: '100%', // Full width on small screens
                    sm: '48%',  // 2 cards in a row on medium screens
                    md: '32%',  // 3 cards in a row on large screens
                  },
                  mb: 2,
                  p: 2, // Add padding all around the card
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <CardContent>
                  {/* Logo and Institution Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {account.institution.logo && (
                      <img
                        src={`data:image/png;base64,${account.institution.logo}`}
                        alt={`${account.institution.name} logo`}
                        style={{
                          width: '40px',
                          height: 'auto',
                          marginRight: '10px', // Add spacing between logo and text
                          borderRadius: '8px',
                        }}
                      />
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {account.institution.name}
                    </Typography>
                  </Box>

                  {/* Account List */}
                  <List>
                    {account.accounts?.map((acc) => (
                      <ListItem key={acc.id}>
                        <ListItemText
                          primary={acc.name}
                          secondary={`Type: ${acc.type}, Subtype: ${acc.subtype}, Mask: ${acc.mask}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                {/* Card Controls (Buttons) */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1, // Padding around buttons for spacing
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'var(--color-tertiary)', // Tailwind color from your config
                      color: 'var(--color-tertiary)', // Tailwind color from your config
                      '&:hover': {
                        borderColor: 'var(--color-tertiary-dark)',
                        backgroundColor: 'var(--color-tertiary-light)', // Optional: lighter shade on hover
                      },
                    }}
                    onClick={() => handleRemove(account.id)}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: '10px', // Reduce font size
                      backgroundColor: 'var(--color-primary)', // Tailwind primary color
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'var(--color-primary-dark)', // Optional: darker primary color on hover
                      },
                    }}
                    onClick={() => handleSeeDetails(account)} // Handle 'See Details' click
                  >
                    See Details
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: -12, mb: -12, display: 'flex', justifyContent: 'right' }}>
            <PlaidLink
              handlePlaidSuccess={handlePlaidSuccess}
              setOpenPlaidModal={setOpenPlaidModal}
              connectedAccounts={connectedAccounts}
            />
          </Box>

          {/* Account Details Modal */}
          <Modal open={openModal} >
            <Box sx={{ width: 400, p: 4, margin: 'auto', mt: '10%' }}>
              {/* Show AccountDetails once access_token is available */}
              {accountDetails && (
                <AccountDetails onClose={handleCloseModal} account={accountDetails} accessToken={accountDetails?.access_token} />
              )}
            </Box>
          </Modal>

        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PlaidLink
            handlePlaidSuccess={handlePlaidSuccess}
            setOpenPlaidModal={setOpenPlaidModal}
            connectedAccounts={connectedAccounts}
          />
        </Box>
      )}
    </Box>
  );
}
