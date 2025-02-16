import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Typography,
  Button,
  Grid2,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/router";
import ApplyModal from "/components/ApplyModal"; // Ensure this component is using MUI as well

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
          bgcolor: "var(--color-primary)",
          color: "white",
          py: 8,
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={600} gutterBottom>
            Empower Financial Network
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Get your verified Proof of Funds in minutes. No more screenshots or
            waiting on your bank—instant, secure, and ready when you need it.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--color-text)",
              color: "white",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              "&:hover": { backgroundColor: "var(--color-secondary)" },
            }}
            onClick={handleOpenModal}
          >
            Check My Rate
          </Button>
        </Container>
      </Box>

      {/* Key Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid2 container spacing={4}>
          {[
            {
              title: "Knowledgeable Experts",
              description:
                "Our team of financial experts is here to guide you every step of the way, ensuring you make informed decisions about your financial future.",
            },
            {
              title: "Rapid Response",
              description:
                "We understand that time is of the essence. That's why we prioritize quick and efficient responses to all your inquiries.",
            },
            {
              title: "No Cost to You",
              description:
                "There is no cost to speak with an expert and understand what your opportunities are. We are committed to helping you achieve financial freedom.",
            },
          ].map((item, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "white",
                  borderRadius: "12px",
                  boxShadow: 4,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="var(--color-text)"
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          bgcolor: "var(--color-secondary)",
          py: 8,
          px: 4,
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight={600}
            color="var(--color-text)"
            gutterBottom
          >
            Why Choose Us?
          </Typography>
          <Grid2 container spacing={4} justifyContent="center">
            {[
              {
                title: "Personal Loans",
                description:
                  "Apply online, get instant offers, and receive your funds. Simple!",
              },
              {
                title: "Loan Consolidation",
                description:
                  "Consolidate what you owe, then make one monthly payment. It’s that easy!",
              },
              {
                title: "HELOC",
                description:
                  "Our reports are trusted by top lenders and real estate agencies across the country.",
              },
            ].map((item, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: "white",
                    borderRadius: "12px",
                    boxShadow: 4,
                    p: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="var(--color-text)"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <ApplyModal open={openModal} onClose={handleCloseModal} />
    </>
  );
}
