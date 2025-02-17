import "../styles/globals.css";
import React, { useState } from "react";
import Head from "next/head";
import { ConnectedAccountsProvider } from "../context/ConnectedAccounts";
import { UserProvider } from "../context/UserContext";
import { Snackbar, Alert } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/empower-horizontal-logo.svg"
        />
      </Head>
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
    </>
  );
}

export default MyApp;
