import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

const keyFeatures = [
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
];

const KeyFeatures = () => {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
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
          The Empower Financial Network Advantage
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
          {keyFeatures.map((item, index) => (
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

export default KeyFeatures;
