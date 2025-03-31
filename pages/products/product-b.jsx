import React from "react";
import { Typography, Container, Paper, Button } from "@mui/material";

const ProductBPage = ({
  productName,
  interestRate,
  installment,
  description,
}) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {productName}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Interest Rate: {interestRate}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Installment: {installment}
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Apply Now
        </Button>
      </Paper>
    </Container>
  );
};

export default ProductBPage;
