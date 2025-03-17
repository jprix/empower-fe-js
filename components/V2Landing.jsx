import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import KeyFeatures from "./KeyFeatures";
import WhyChooseUs from "./WhyChooseUs";
import { useRouter } from "next/router";
import ApplyModal from "./ApplyModal";

const V2Landing = ({ flags }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Box
        sx={{
          bgcolor: "var(--color-primary-light)",
          color: "black",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} textAlign="left">
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Get Verified Proof of Funds – Instantly.
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mb: 3 }}>
                No more waiting on your bank—secure, instant, and verified when
                you need it most.
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
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    "&:hover": { backgroundColor: "var(--color-primary)" },
                  }}
                  onClick={handleOpenModal}
                >
                  {" "}
                  Check My Rate
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  bgcolor: "gray",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: "white",
                }}
              >
                [ Image Placeholder ]
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <KeyFeatures />
      <WhyChooseUs />
      <ApplyModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default V2Landing;
