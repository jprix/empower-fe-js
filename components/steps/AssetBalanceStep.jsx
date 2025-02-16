// components/steps/AccountBalanceStep.js
import React from 'react';
import { Button, Typography, Box } from '@mui/material';

export default function AssetBalanceStep({ onNext }) {
  const handleAccountBalances = () => {
    // Logic to retrieve account balances
    onNext();
  };

  return (
    <Box>
      <Typography variant="h6">Step 2: Retrieve Account Balances</Typography>
      <Button variant="contained" sx={{
        backgroundColor: 'var(--color-tertiary)', // Use Tailwind's tertiary color
        '&:hover': {
          backgroundColor: 'var(--color-tertiary-dark)', // Optional: Define a darker shade for hover
        },
      }} onClick={handleAccountBalances}>
        Get Asset Balances
      </Button>
    </Box>
  );
}
