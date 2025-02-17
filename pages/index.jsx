import React, { useState } from "react";
import Head from "next/head";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import ApplyModal from "/components/ApplyModal"; // Ensure this component is using MUI as well
import KeyFeatures from "/components/KeyFeatures"; // Ensure this component is using MUI as well
import WhyChooseUs from "/components/WhyChooseUs";
export default function Home() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
        </Container>
      </Box>

      <KeyFeatures />

      <WhyChooseUs />

      <ApplyModal open={openModal} onClose={handleCloseModal} />
    </>
  );
}
