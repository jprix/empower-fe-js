import React, { useEffect, useState } from 'react';
import { useConnectedAccounts } from '../../context/ConnectedAccounts';
import { Box, Button, Typography } from '@mui/material';

export default function ExchangeTokens() {
  const { connectedAccounts, updateConnectedAccount } = useConnectedAccounts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const exchangeTokens = async () => {
      setLoading(true);
      try {
        // Iterate over each connected account
        for (const account of connectedAccounts) {
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

          // Update the connected account with the new access token
          updateConnectedAccount(account.link_session_id, {
            access_token: data.access_token,
          });

          console.log(`Access token for ${account.institution.name}:`, data.access_token);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      } finally {
        console.log('Exchange Tokens: Completed', connectedAccounts);
      }
    };

    exchangeTokens();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
      {loading ? (
        <>
          <Typography variant="h6" gutterBottom>
            Exchanging Tokens...
          </Typography>
        </>
      ) : (
        <>
          {error && (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          )}
          {!loading && !error && (
            <Button variant="contained" sx={{
              backgroundColor: 'var(--color-tertiary)',
              '&:hover': {
                backgroundColor: 'var(--color-tertiary-dark)',
              },
            }}>
              Proceed to Next Step
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
