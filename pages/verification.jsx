import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useRouter } from "next/router"; // For Next.js navigation events
import PlaidLinkStep from "../components/steps/PlaidLinkStep";
import AccountBalanceStep from "../components/steps/AccountBalanceStep";
import CreateReportStep from "../components/steps/CreateReportStep";
import ViewReportStep from "../components/steps/ViewReportStep";
import { useConnectedAccounts } from "../context/ConnectedAccounts";
import ConfirmIdentityStep from "../components/ConfirmIdentity";

const steps = [
  "Connect Bank",
  "Confirm Identity",
  "Retrieve Account Balances",
  "Create Report",
  "View POF Summary",
];

export default function Verification() {
  const [activeStep, setActiveStep] = useState(0);
  const [openPlaidModal, setOpenPlaidModal] = useState(false);
  const { connectedAccounts } = useConnectedAccounts();
  const [accountsTokens, setAccountsTokens] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleRouteChange = (url) => {
      const confirmation = window.confirm(
        "Are you sure you want to leave? Your progress will be deleted."
      );
      if (!confirmation) {
        router.events.emit("routeChangeError");
        throw new Error("Route change aborted.");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (connectedAccounts.length > 0) {
      const tokens = connectedAccounts.map((account) => account.access_token);
      setAccountsTokens(tokens);
    }
  }, [connectedAccounts]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <PlaidLinkStep
            onNext={handleNext}
            openPlaidModal={openPlaidModal}
            setOpenPlaidModal={setOpenPlaidModal}
          />
        );

      case 1:
        return <ConfirmIdentityStep onNext={handleNext} />;
      case 2:
        return <AccountBalanceStep onNext={handleNext} />;

      case 3:
        return (
          <CreateReportStep
            accountsTokens={accountsTokens}
            onNext={handleNext}
          />
        );
      case 4:
        return <ViewReportStep onNext={handleNext} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {steps[activeStep] !== "View POF Summary" && (
          <Paper
            elevation={3}
            sx={{ p: 2, mb: 2, mx: "auto", width: "100%", flexShrink: 0 }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "var(--color-primary)",
              }}
            >
              Proof of Funds Verification Process
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        color:
                          activeStep === index
                            ? undefined
                            : "var(--color-tertiary)",
                      },
                    }}
                    style={{
                      "--MuiStepIcon-root-color":
                        activeStep === index
                          ? "var(--color-tertiary)"
                          : undefined,
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        )}

        {/* Main Grid Content */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <Grid2
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            <Card
              elevation={3}
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {" "}
              {/* 'mb: 2' adds bottom margin */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  "& > :not(:last-child)": { marginBottom: 2 },
                }}
              >
                {" "}
                {/* Adds spacing between cards */}
                {activeStep === steps.length ? (
                  <>
                    <Typography variant="h6" align="center">
                      All steps completed - you're finished
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleReset}
                        sx={{
                          backgroundColor: "var(--color-tertiary)",
                          "&:hover": {
                            backgroundColor: "var(--color-tertiary-dark)",
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>{getStepContent(activeStep)}</>
                )}
              </CardContent>
            </Card>
          </Grid2>
        </Box>

        {/* Footer: Step Controls */}
        {connectedAccounts.length > 0 && (
          <Box sx={{ pb: 2, px: 2, flexShrink: 0, mt: 2 }}>
            {activeStep < steps.length && (
              <Grid2 container justifyContent="space-between">
                <Grid2 item>
                  <Button
                    variant="contained"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                      backgroundColor: "var(--color-primary)",
                      "&:active": {
                        backgroundColor: "var(--color-tertiary-dark)",
                      },
                    }}
                  >
                    Back
                  </Button>
                </Grid2>
                <Grid2 item>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: "var(--color-primary)",
                      "&:active": {
                        backgroundColor: "var(--color-tertiary-dark)",
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Grid2>
              </Grid2>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
