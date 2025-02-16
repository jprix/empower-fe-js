import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, FormControl, Select, Button } from '@mui/material';
import { useConnectedAccounts } from '../context/ConnectedAccounts';
import { useUser } from '../context/UserContext';

export default function ConfirmIdentityStep({ onNext }) {
  const { connectedAccounts } = useConnectedAccounts();
  const { updateUser } = useUser();
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [identityData, setIdentityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');

  // Fetch identity data when an account is selected
  useEffect(() => {
    if (selectedAccountId) {
      const selectedAccount = connectedAccounts.find(account => account.account_id === selectedAccountId);
      if (selectedAccount) {
        setAccessToken(selectedAccount.access_token);
        fetchIdentityData(selectedAccount.access_token);
      }
    }
  }, [selectedAccountId]);

  const fetchIdentityData = async (token) => {
    setLoading(true);
    try {
      const response = await fetch('/api/identity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: token,
        }),
      });
      const data = await response.json();
      setIdentityData(data);
    } catch (error) {
      console.error('Error fetching identity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  const handleAccept = () => {
    if (identityData) {
      setAccepted(true);
      updateUser({
        name: selectedName,
        email: selectedEmail,
        phoneNumber: selectedPhoneNumber,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" className="bg-white">
        {/* Spinner using logo */}
        <img
          src="/empower-horizontal-logo.svg"
          alt="Loading spinner"
          className="w-40 h-40 animate-pulse"
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto', mb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'var(--color-primary)', mb: 4 }}>
        Confirm Your Identity
      </Typography>

      {connectedAccounts.length > 0 && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={selectedAccountId}
            onChange={handleAccountChange}
            displayEmpty
            variant="outlined"
            fullWidth
          >
            <MenuItem value="" disabled>Select Account</MenuItem>
            {connectedAccounts.map((account) => (
              <MenuItem key={account.account_id} value={account.account_id}>
                {account.institution.name} - {account.accounts[0].name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {identityData && (
        <>
          {/* Name Selection */}
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography>Select Name:</Typography>
            <Select
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>Select Name</MenuItem>
              {identityData.accounts[0]?.owners[0]?.names.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Email Selection */}
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography>Select Email:</Typography>
            <Select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>Select Email</MenuItem>
              {identityData?.accounts[0]?.owners[0]?.emails.map((email, index) => (
                <MenuItem key={index} value={email.data}>
                  {email.data} ({email.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Phone Number Selection */}
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography>Select Phone Number:</Typography>
            <Select
              value={selectedPhoneNumber}
              onChange={(e) => setSelectedPhoneNumber(e.target.value)}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>Select Phone Number</MenuItem>
              {identityData?.accounts[0]?.owners[0]?.phone_numbers.map((phone, index) => (
                <MenuItem key={index} value={phone.data}>
                  {phone.data} ({phone.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {identityData && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            By accepting, you confirm that the above identity data is accurate and will only be used for this report.
          </Typography>
          <Button
            variant="contained"
            color="bg-tertiary"
            onClick={handleAccept}
            disabled={!selectedName || !selectedEmail || !selectedPhoneNumber || accepted}
          >
            {accepted ? 'Data Accepted' : 'Accept & Proceed'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
