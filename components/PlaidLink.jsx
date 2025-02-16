import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useConnectedAccounts } from '../context/ConnectedAccounts';
import { Button, Box, Typography, AppBar } from '@mui/material';

export default function PlaidLink({ handlePlaidSuccess, setOpenPlaidModal, connectedAccounts }) {
  const { addConnectedAccount, updateConnectedAccount } = useConnectedAccounts();
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('Connected Accounts:', connectedAccounts.length === 0 ? 'No connected accounts' : connectedAccounts);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch('/api/tokens/create');
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkToken();
  }, []);

  const config = {
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      console.log('Metadata:', metadata);
      addConnectedAccount(metadata);
      const response = await fetch(`/api/institutions/search?name=${metadata.institution.name}`);

      const institutionalData = await response.json();
      console.log('Institutional DataX:', institutionalData.Institutions);
      console.log('DataY:', institutionalData.Institutions[0]);

      updateConnectedAccount(metadata?.link_session_id, {
        institution: institutionalData.Institutions[0],
      });

      handlePlaidSuccess();
    },
    onExit: (error, metadata) => {
      if (error) {
        console.error('Exit Error:', error);
      }
      console.log('Exit Metadata:', metadata);
    },
  };



  const { open, ready, error } = usePlaidLink(config);

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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="20vh"> {/* Reduced minHeight */}
      {error && (
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      )}

      <AppBar position="static" sx={{ top: 'auto', bottom: 0, width: '100%', mt: -10, mb: -10, boxShadow: 'none' }}>
        <Button
          onClick={() => open()}
          disabled={!ready}
          variant="contained"
          sx={{
            mx: 'auto', // Center the button
            backgroundColor: 'var(--color-tertiary)', // Use Tailwind's tertiary color
            color: 'white',
            '&:hover': {
              backgroundColor: 'var(--color-tertiary-dark)', // Optional: Define a darker shade for hover
            },
          }}
        >
          {connectedAccounts.length > 0 ? 'Add Another Account' : 'Connect Your Bank Account'}
        </Button>
      </AppBar>
    </Box>
  );
}
