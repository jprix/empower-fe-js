import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import KeyFeatures from "./KeyFeatures";
import WhyChooseUs from "./WhyChooseUs";
import { useRouter } from "next/router";
import ApplyModal from "./ApplyModal";

const V1Landing = ({ flags }) => {
  const speakWithSpecialist = flags["speak-with-specialist"] ?? false;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const router = useRouter();
  return (
    <>
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
            sx={{ opacity: 0.9, mb: 4, color: "#000000" }}
          >
            Get your verified Proof of Funds in minutes. No more waiting on your
            bank—instant, secure, and ready when you need it.
          </Typography>

          {/* ✅ Show only one button based on flag */}
          {flags.speakWithSpecialist ? (
            <Button
              variant="contained"
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
          ) : (
            <Button
              variant="contained"
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
              onClick={handleOpenModal}
            >
              Check My Rate
            </Button>
          )}
        </Container>
      </Box>

      <KeyFeatures />
      <WhyChooseUs />
      <ApplyModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default V1Landing;
