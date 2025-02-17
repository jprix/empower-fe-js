import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Icon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Example icon, can be customized

const keyFeatures = [
  {
    title: "Knowledgeable Experts",
    description:
      "Our team of financial experts is here to guide you every step of the way, ensuring you make informed decisions about your financial future.",
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    title: "Rapid Response",
    description:
      "We understand that time is of the essence. That's why we prioritize quick and efficient responses to all your inquiries.",
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    title: "No Cost to You",
    description:
      "There is no cost to speak with an expert and understand what your opportunities are. We are committed to helping you achieve financial freedom.",
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
];

const KeyFeatures = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F9FAFB",
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
          Why Choose Empower Financial Network?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {keyFeatures.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "white",
                  borderRadius: "16px",
                  boxShadow: 3,
                  p: 3,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
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
                    sx={{ color: "#1E293B", mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
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

export default KeyFeatures;
