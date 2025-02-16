import React, { useState, useEffect } from 'react';
import { useDynamicContext, useSendBalance, useIsLoggedIn, useUserWallets, useSwitchWallet, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { Button, Box, Card, Typography, CircularProgress, CardContent, Avatar } from '@mui/material';
import Header from '../components/Header';
import { parseEther } from 'ethers'
import { FC } from 'react';

import {
    useWriteContract,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';


export default function DynamicMethods({ isDarkMode }) {
    const isLoggedIn = useIsLoggedIn();
    const { sdkHasLoaded, primaryWallet, user, setShowAuthFlow } = useDynamicContext();
    const userWallets = useUserWallets();
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState('');
    const [walletState, setWalletState] = useState(null); // Track the current wallet state
    const switchWallet = useSwitchWallet(); // Hook for switching wallets
    const { open } = useSendBalance()


    // const triggerAuthFlow = () => {
    //     setShowAuthFlow(true);  // Opens Dynamic's authentication UI
    // };

    // Function to reconnect the wallet if disconnected
    const reconnectWallet = async (walletId) => {
        try {
            await switchWallet(walletId);
            console.log(`Reconnected wallet: ${walletId}`);
        } catch (error) {
            console.error('Error reconnecting wallet:', error);
        }
    };



    const checkWalletConnection = async () => {
        if (primaryWallet && !primaryWallet.isConnected) {
            // Attempt to reconnect if the wallet is not connected
            await reconnectWallet(primaryWallet.id);
        }
    };

    const safeStringify = (obj) => {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return '[Circular]';
                }
                seen.add(value);
            }
            return value;
        }, 2);
    };

    // UseEffect to check wallet connection and set wallet state on load
    useEffect(() => {
        if (sdkHasLoaded && primaryWallet) {
            if (!primaryWallet.isConnected) {
                reconnectWallet(primaryWallet.id);
            }
            setWalletState(primaryWallet); // Set wallet state
            setIsLoading(false);
        }
    }, [sdkHasLoaded, primaryWallet]);

    // Function to clear the result output
    function clearResult() {
        setResult('');
    }

    function showUser() {
        setResult(safeStringify(user));
    }

    function showUserWallets() {
        setResult(safeStringify(userWallets));
    }

    // Fetch public client for Ethereum wallets
    async function fetchPublicClient() {
        await checkWalletConnection(); // Ensure wallet is connected before action

        if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
        const publicClient = await primaryWallet.getPublicClient();
        setResult(safeStringify(publicClient));
    }

    // Fetch wallet client for Ethereum wallets
    async function fetchWalletClient() {
        await checkWalletConnection(); // Ensure wallet is connected before action

        if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
        const walletClient = await primaryWallet.getWalletClient();
        setResult(safeStringify(walletClient));
    }

    const sendTransaction = async () => {
        console.log('Sending transaction...');

        try {
            console.log('try transaction...');
            const tx = await open({
                recipientAddress: '0xcC90c7c3E3Ad6e4E6bd8CF4fB10D09edC20a9506',
                value: parseEther('1'),
            })

            console.log('Transaction sent:', tx);
        } catch (err) {
            // Handle the promise rejection
        }
    }

    const openDynamicModal = () => {
        setShowAuthFlow(true); // Open the Dynamic modal when needed
    };

    // Sign message using the primary wallet
    async function signMessage() {
        await checkWalletConnection(); // Ensure wallet is connected before action

        if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
        const signature = await primaryWallet.signMessage("Hello World");
        setResult(signature);
    }


    // Handle switching between wallets
    async function handleSwitchWallet(walletId) {
        try {
            await switchWallet(walletId); // Switch to the wallet
            setWalletState(userWallets.find((wallet) => wallet.id === walletId)); // Set the new wallet state
            console.log(`Switched to wallet: ${walletId}`);
        } catch (error) {
            console.error('Error switching wallet:', error);
        }
    }

    return (
        <>
            <Header />
            <Box sx={{ padding: '20px' }}>
                <Card sx={{ padding: '20px', marginBottom: '20px' }}>
                    <CardContent>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    Dynamic Methods
                                </Typography>

                                {/* Buttons for fetching user and wallets */}
                                <Button variant="contained" onClick={showUser} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                    Fetch User
                                </Button>
                                <Button variant="contained" onClick={showUserWallets} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                    Fetch User Wallets
                                </Button>

                                {/* Ethereum wallet actions */}
                                {isEthereumWallet(primaryWallet) && (
                                    <>
                                        <Button variant="contained" onClick={fetchPublicClient} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                            Fetch Public Client
                                        </Button>
                                        <Button variant="contained" onClick={fetchWalletClient} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                            Fetch Wallet Client
                                        </Button>
                                        <Button variant="contained" onClick={signMessage} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                            Sign 'Hello World' on Ethereum
                                        </Button>
                                        <Button variant="contained" onClick={openDynamicModal} sx={{ marginRight: '10px', marginBottom: '10px' }}>
                                            Send Crypto
                                        </Button>
                                    </>
                                )}

                                {/* Wallet switching buttons */}
                                <Typography variant="h6" sx={{ marginTop: '20px' }}>Switch Wallet</Typography>
                                {userWallets.map((wallet) => (
                                    <Button
                                        key={wallet.id}
                                        variant="outlined"
                                        onClick={() => handleSwitchWallet(wallet.id)}
                                        sx={{ marginRight: '10px', marginBottom: '10px' }}
                                    >
                                        Switch to {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                                    </Button>
                                ))}

                                {/* Show current wallet state */}
                                {walletState && (
                                    <>
                                        <DynamicWidget />
                                        <Box sx={{ marginTop: '20px' }}>
                                            <Typography variant="body1" gutterBottom>
                                                Current Wallet:
                                            </Typography>
                                            <Typography variant="body2">Address: {walletState.address}</Typography>
                                            <Typography variant="body2">Connected: {walletState.isConnected ? 'Yes' : 'No'}</Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        )}

                        {result && (
                            <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="body1" gutterBottom>
                                    Result:
                                </Typography>
                                <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
                                    {result}
                                </pre>
                                <Button variant="outlined" onClick={clearResult} sx={{ marginTop: '10px' }}>
                                    Clear
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box >
        </>
    );
}

