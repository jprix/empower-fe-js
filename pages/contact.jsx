import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const ContactPage = () => {
  const theme = useTheme(); // Get the theme for consistent styling

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          align="center"
          color={theme.palette.primary.main}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ opacity: 0.7, mb: 3 }}>
          Have questions? We'd love to hear from you!
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={3}>
            {/* Name Field */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Message Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                  display: "block",
                  mx: "auto",
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
