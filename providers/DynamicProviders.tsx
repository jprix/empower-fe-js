import React, { useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin';



export const DynamicProviders = ({ children }: { children: React.ReactNode }) => {

    return (
        <DynamicContextProvider
            settings={{
                // apiBaseUrl: "https://auth.jasonparisi.com",
                environmentId: "78d7e25d-3321-43df-a1a0-6ed620ce0d47",
                //walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors, SolanaWalletConnectors, BitcoinWalletConnectors],
                events: {
                    onUserProfileUpdate: (user) => {
                        console.log('onUserProfileUpdate was called', user);
                }
                },
                eventsCallbacks: {
                    onWalletAdded: (user) => {
                        console.log('onWalletAdded was called', user);
                    },
                    onUserProfileUpdate: (user) => {
                        console.log('onUserProfileUpdate callback was called', user);
                }
                },
            }}
        >
            {children}
        </DynamicContextProvider>
    );
};

export default DynamicProviders;
