import React, { useState, useEffect } from 'react';
import { useDynamicContext, useUserWallets, useRpcProviders, useTokenBalances } from '@dynamic-labs/sdk-react-core';
import { evmProvidersSelector } from '@dynamic-labs/ethereum-core';
import { Box, Typography, Button, Card, List, ListItem, Avatar } from '@mui/material';
import Header from '../components/Header';
import Verifications from '../components/Verifications';

export default function Account() {
    const { user, primaryWallet } = useDynamicContext();
    const userWallets = useUserWallets();
    const { defaultProvider } = useRpcProviders(evmProvidersSelector); // Get the EVM provider
    const [selectedCredential, setSelectedCredential] = useState('');
    const [currentAccount, setCurrentAccount] = useState({});
    const [balance, setBalance] = useState(null);
    const [usdBalance, setUsdBalance] = useState(null);
    const ETH_TO_USD_API = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    const [ethToUsdRate, setEthToUsdRate] = useState('');
    const [ethBalance, setEthBalance] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const { tokenBalances, isLoading, isError, error } = useTokenBalances();


    console.log('tokenBalances', tokenBalances);
    useEffect(() => {
        fetchEthToUsdRate();
    }, []);

    const fetchEthToUsdRate = async () => {
        try {
            const response = await fetch(ETH_TO_USD_API);
            const data = await response.json();
            setEthToUsdRate(data.ethereum.usd);
        } catch (error) {
            console.error('Error fetching ETH to USD rate:', error);
            return null;
        }
    };

    const handleCredentialChange = (event) => {
        const account = user?.verifiedCredentials.find(vc => vc.id === event.target.value);
        console.log('account', account);

        setCurrentAccount(account);
        setSelectedCredential(event.target.value);
        setBalance(null); // Reset balance when a new account is selected
        setUsdBalance(null); // Reset USD balance
    };

    const signMessage = async () => {
        const wallet = userWallets.find(w => w.id === selectedCredential);
        if (!wallet) return;

        const message = 'You are awesome';
        try {
            const signature = await wallet.signMessage(message);
            console.log('Signature:', signature);
            alert('Message signed! Check the console for the signature.');
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    const sendTransaction = async () => {
        const wallet = userWallets.find(w => w.id === selectedCredential);
        if (!wallet) return;

        const ethValue = '0.0000000000001'; // Value in ETH
        const weiValue = BigInt(Number(ethValue) * 10 ** 18);

        try {
            const tx = await wallet.sendTransaction({
                to: '0xcC90c7c3E3Ad6e4E6bd8CF4fB10D09edC20a9506',
                value: weiValue,
            });
            console.log('tx', tx);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };



    return (
        <>
            <Header />
            <Box sx={{ padding: '20px' }}>
                <Card sx={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'var(--color-primary)' }}>
                        Profile
                    </Typography>
                    {user ? (
                        <>
                            <List>
                                <ListItem><Typography variant="body1"><strong>User ID:</strong> {user.userId}</Typography></ListItem>
                                <ListItem><Typography variant="body1"><strong>Email:</strong> {user.email}</Typography></ListItem>
                                <ListItem><Typography variant="body1"><strong>Session ID:</strong> {user.sessionId}</Typography></ListItem>
                                <ListItem><Typography variant="body1"><strong>Environment ID:</strong> {user.environmentId}</Typography></ListItem>
                                <ListItem><Typography variant="body1"><strong>New User:</strong> {user.newUser ? 'Yes' : 'No'}</Typography></ListItem>
                                <ListItem><Typography variant="body1"><strong>Last Verified Credential ID:</strong> {user?.lastVerifiedCredentialId}</Typography></ListItem>
                            </List>
                            {/* Account Dropdown with Card */}
                            <Verifications />
                        </>

                    ) : (

                        <Typography variant="body1">No user information available. Please log in.</Typography>
                    )}
                </Card >

            </Box >
        </>
    );
}
