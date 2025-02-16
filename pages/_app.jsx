import "../styles/globals.css";
import React, { useState } from "react";
import { ConnectedAccountsProvider } from "../context/ConnectedAccounts";
import { UserProvider } from "../context/UserContext";
import { DynamicProviders } from "../providers/DynamicProviders";
import { Snackbar, Alert } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  return (
    <DynamicProviders>
      <ConnectedAccountsProvider>
        <UserProvider>
          <Header />
          <Component {...pageProps} />
          <Snackbar
            open={logoutSuccess}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              You have been logged out successfully!
            </Alert>
          </Snackbar>
        </UserProvider>
      </ConnectedAccountsProvider>
      <Footer />
    </DynamicProviders>
  );
}

export default MyApp;
