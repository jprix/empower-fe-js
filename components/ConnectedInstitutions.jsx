import React, { useEffect } from 'react';
import { useConnectedAccounts } from '../context/ConnectedAccounts';

export const ConnectedInstitutions = () => {
  const { connectedAccounts,
    addConnectedAccount,
    updateConnectedAccount } = useConnectedAccounts();

//   useEffect(() => {
//     // Example of adding a new provider
//     const newAccount = {
//       status: null,
//       link_session_id: '32894c25-9aa9-4c22-8f60-c1f6f7c6c64f',
//       institution: {
//         name: 'Chase',
//         institution_id: 'ins_56',
//       },
//       accounts: [
//         {
//           id: 'DJXe7krDoNfbR8VK6e3whg1W4DVPBXT3JzrAl',
//           name: 'Plaid Checking',
//           mask: '0000',
//           type: 'depository',
//           subtype: 'checking',
//         },
//       ],
//       account_id: 'DJXe7krDoNfbR8VK6e3whg1W4DVPBXT3JzrAl',
//       public_token: 'public-sandbox-0c65cedd-ddb4-4626-8511-18f5fe812a1a',
//     };
//     addConnectedAccount(newAccount);

//     // Example of updating a provider
//     updateConnectedAccount('32894c25-9aa9-4c22-8f60-c1f6f7c6c64f', { status: 'active' });
//   }, [updateConnectedAccount, updateConnectedAccount]);

  return (
    <div>
      <h1>Connected Institutions</h1>
      {connectedAccounts?.map((account, index) => (
        <div key={index}>
          <h2>{account?.institution?.name}</h2>
          <p>Status: {account?.status || 'Pending'}</p>
        </div>
      ))}
    </div>
  );
};

export default ConnectedInstitutions;
