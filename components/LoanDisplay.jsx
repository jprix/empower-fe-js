import React from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";

const loanConfig = {
  loanOptions: [
    {
      creditScoreMin: 720,
      creditScoreMax: 850,
      productsToShow: [
        {
          name: "Product A",
          interestRate: "3.5%",
          installment: "24 Months",
          description:
            "Best for high credit scores with lowest interest rates.",
        },
        {
          name: "Product B",
          interestRate: "4.0%",
          installment: "36 Months",
          description: "Balanced loan option for stable financial plans.",
        },
        {
          name: "Product C",
          interestRate: "4.5%",
          installment: "48 Months",
          description: "Extended plan with moderate rates.",
        },
      ],
    },
    // Add other credit score ranges and products similarly...
  ],
};

const LoanDisplay = ({ userCreditScore }) => {
  const products = loanConfig.loanOptions.find(
    (option) =>
      userCreditScore >= option.creditScoreMin &&
      userCreditScore <= option.creditScoreMax
  )?.productsToShow;

  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <Typography variant="h6" style={{ textAlign: "center", marginTop: 20 }}>
        No loan products available for your credit score.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} md={4} key={product.name}>
          <Paper
            elevation={3}
            style={{ padding: "20px", textAlign: "center", height: "100%" }}
          >
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Interest Rate"
                  secondary={
                    <Link
                      href={`/products/${product.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {product.interestRate}
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Installment"
                  secondary={
                    <Link
                      href={`/products/${product.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {product.installment}
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Description"
                  secondary={
                    <Link
                      href={`/products/${product.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {product.description}
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoanDisplay;
