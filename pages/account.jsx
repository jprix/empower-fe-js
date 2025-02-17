import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import Header from "../components/Header";
import Verifications from "../components/Verifications";

export default function Account() {
  const { defaultProvider } = useRpcProviders(evmProvidersSelector); // Get the EVM provider
  const [selectedCredential, setSelectedCredential] = useState("");
  const [currentAccount, setCurrentAccount] = useState({});
  const [balance, setBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);

  return (
    <>
      <Header />
      <Box sx={{ padding: "20px" }}>
        <Card sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "var(--color-primary)" }}
          >
            Profile
          </Typography>
          <>
            <List>
              <ListItem>
                <Typography variant="body1">
                  <strong>User ID:</strong> 12345
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Email:</strong> email
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Session ID:</strong> 12345
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Environment ID:</strong> 12345
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>New User:</strong>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Last Verified Credential ID:</strong> 12345
                </Typography>
              </ListItem>
            </List>
            {/* Account Dropdown with Card */}
            <Verifications />
          </>
        </Card>
      </Box>
    </>
  );
}
