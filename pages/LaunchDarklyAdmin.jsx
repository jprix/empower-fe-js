import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Container,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import theme from "../theme"; // Ensure theme file is correct
import { ThemeProvider } from "@mui/material/styles";
import { useLDClient } from "launchdarkly-react-client-sdk"; // ✅ Use LDClient for better control

const LaunchDarklyAdmin = () => {
  const router = useRouter();
  const ldClient = useLDClient(); // ✅ Get the LaunchDarkly client
  const [flags, setFlags] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log("Flags:", flags); // Debugging

  // ✅ Fetch all flags from LaunchDarkly
  useEffect(() => {
    if (!ldClient) return;

    const fetchFlags = async () => {
      const allFlags = await ldClient.allFlags(); // ✅ Get all flags dynamically
      console.log("All Flags:", allFlags); // Debugging
      setFlags(allFlags);
      setIsLoading(false);
    };

    fetchFlags();

    // ✅ Get user context and determine if admin
    const userContext = ldClient.getContext();
    console.log("LaunchDarkly Context:", userContext); // Debugging

    const adminCheck = userContext?.custom?.featureAccess === "admin";
    setIsAdmin(adminCheck);

    console.log("Is Admin:", adminCheck);

    // 🚨 Redirect non-admins to homepage if they don't have access
    if (!adminCheck) {
      alert("You do not have access to this page.");
      router.replace("/");
    }
  }, [ldClient, router]);

  // ✅ Toggle a flag using LaunchDarkly API
  const toggleFlag = async (flagKey, currentState) => {
    const newState = !currentState; // Toggle state
    const LD_API_KEY = process.env.NEXT_PUBLIC_LD_API_KEY;
    const LD_PROJECT_KEY = process.env.NEXT_PUBLIC_LD_PROJECT_KEY;
    const LD_ENVIRONMENT_KEY = "production"; // Change to "test" if needed

    try {
      const response = await fetch(
        `https://app.launchdarkly.com/api/v2/flags/${LD_PROJECT_KEY}/${flagKey}`,
        {
          method: "PATCH",
          headers: {
            Authorization: LD_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              op: "replace",
              path: `/environments/${LD_ENVIRONMENT_KEY}/fallthrough/variation`,
              value: newState ? 0 : 1, // ✅ Correctly set on/off variation
            },
          ]),
        }
      );

      if (!response.ok) throw new Error("Failed to update flag");

      console.log(`Flag ${flagKey} updated successfully to ${newState}`);

      // ✅ Update local state instantly for UI feedback
      setFlags((prevFlags) => ({
        ...prevFlags,
        [flagKey]: newState,
      }));
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };

  // ✅ Show loading state until the flag/context is ready
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Head>
          <title>LaunchDarkly Admin</title>
        </Head>

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          LaunchDarkly Feature Flags
        </Typography>

        {Object.keys(flags).length === 0 ? (
          <Typography>No flags found.</Typography>
        ) : (
          Object.entries(flags).map(([flagKey, isFlagOn]) => (
            <Card key={flagKey} sx={{ mb: 2, p: 2 }}>
              <CardContent>
                <Typography variant="h6">{flagKey}</Typography>
                <Box sx={{ mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isFlagOn}
                        onChange={() => toggleFlag(flagKey, isFlagOn)}
                      />
                    }
                    label={`Status: ${isFlagOn ? "Enabled" : "Disabled"}`}
                  />
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </ThemeProvider>
  );
};

export default LaunchDarklyAdmin;
