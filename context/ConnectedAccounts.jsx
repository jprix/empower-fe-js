import React, { createContext, useState, useContext } from 'react';

// Create the context
const ConnectedAccountsContext = createContext();

// Custom hook to use the ConnectedAccountsContext
export const useConnectedAccounts = () => {
  return useContext(ConnectedAccountsContext);
};

// Provider component
export const ConnectedAccountsProvider = ({ children }) => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  // Add a connected account
  const addConnectedAccount = (newAccount) => {
    setConnectedAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  };

  // Update a connected account by link_session_id
  const updateConnectedAccount = (link_session_id, updatedData) => {
    console.log('Updated Data:', updatedData);
    setConnectedAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.link_session_id === link_session_id
          ? { ...account, ...updatedData }
          : account
      )
    );
  };

  // Context value
  const value = {
    connectedAccounts,
    addConnectedAccount,
    updateConnectedAccount,
  };

  return (
    <ConnectedAccountsContext.Provider value={value}>
      {children}
    </ConnectedAccountsContext.Provider>
  );
};
