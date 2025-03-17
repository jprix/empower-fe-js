import React, { useState } from "react";
import Head from "next/head";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import ApplyModal from "/components/ApplyModal";
import KeyFeatures from "/components/KeyFeatures";
import WhyChooseUs from "/components/WhyChooseUs";
import { useFlags } from "launchdarkly-react-client-sdk"; // ✅ Fix import

export default function Home() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const flags = useFlags(); // ✅ Fix usage
  const speakWithSpecialist = flags["speak-with-specialist"] ?? false; // ✅ Use bracket notation correctly

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  console.log("LaunchDarkly Flags:", flags.speakWithSpecialist);
  console.log("Speak with Specialist Flag Value:", speakWithSpecialist);

  return (
    <>
      <Head>
        <title>Empower Financial Network</title>
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "var(--color-secondary)",
          color: "white",
          py: 8,
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={600}
            gutterBottom
            sx={{ color: "var(--color-primary)" }}
          >
            Apply now and take the first step towards financial freedom!
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.9, mb: 4, color: "#000000", variant: "h3" }}
          >
            Get your verified Proof of Funds in minutes. No more screenshots or
            waiting on your bank—instant, secure, and ready when you need it.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              "&:hover": { backgroundColor: "var(--color-primary)" },
            }}
            onClick={handleOpenModal}
          >
            Check My Rate
          </Button>

          {/* ✅ Speak with Specialist Button - Uses Correct Flag Access */}
          {flags.speakWithSpecialist && (
            <Button
              variant="outlined"
              sx={{
                display: "block",
                mt: 3,
                color: "var(--color-primary)",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderColor: "var(--color-primary)",
                "&:hover": { borderColor: "var(--color-primary)" },
              }}
              onClick={() => router.push("/contact")}
            >
              Speak with a Specialist
            </Button>
          )}
        </Container>
      </Box>

      <KeyFeatures />
      <WhyChooseUs />
      <ApplyModal open={openModal} onClose={handleCloseModal} />
    </>
  );
}
