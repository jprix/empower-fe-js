import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const whyChooseUsItems = [
  {
    title: "Personal Loans",
    description: (
      <>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Apply online , get instant offers, and receive your funds. Simple!
        </span>
      </>
    ),
    color: "var(--color-secondary)",
    icon: (
      <MonetizationOnIcon
        sx={{ fontSize: 50, color: "var(--color-primary)" }}
      />
    ), // Gold color
  },
  {
    title: "Loan Consolidation",
    description: (
      <>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Consolidate what you owe, then make one easy monthly payment. It’s
          that easy!
        </span>
      </>
    ),
    icon: (
      <AccountBalanceIcon
        sx={{ fontSize: 50, color: "var(--color-primary)" }}
      />
    ),
  },
  {
    title: "HELOC",
    description: (
      <>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Renovate, invest, consolidate – use home equity to turn dreams into
          realities.
        </span>{" "}
      </>
    ),
    icon: <HomeWorkIcon sx={{ fontSize: 50, color: "var(--color-primary)" }} />,
  },
];

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        bgcolor: "var(--color-secondary)", // Dark blue-gray background
        py: 10,
        px: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ color: "#333", mb: 4 }}
        >
          Why Choose Empower Financial?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {whyChooseUsItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "linear-gradient(135deg, #3B82F6 30%, #9333EA 100%)", // Blue-Purple Gradient
                  color: "#fff",
                  borderRadius: "16px",
                  boxShadow: 4,
                  p: 3,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "#333", mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#E5E7EB" }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
