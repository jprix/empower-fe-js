import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

const whyChooseUsItems = [
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
];

const WhyChooseUs = () => {
  return (
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          gutterBottom
        >
          Why Choose Empower Financial?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
          }}
        >
          {whyChooseUsItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                boxShadow: 4,
                p: 3,
                textAlign: "center",
                flex: "1 1 30%", // Responsive width, prevents stacking
                minWidth: "280px",
                maxWidth: "350px",
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
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
