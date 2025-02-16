import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid2,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ThemeProvider } from "@mui/system";
import theme from "../theme";
import { getStates } from "../helpers/getStates";

const ApplyModal = ({ open, onClose }) => {
  const initialValues = {
    firstName: "Jay",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    debtRange: "Less than 50,000",
    agreeTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be less than 50 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .trim()
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be less than 50 characters")
      .required("Last Name is required"),

    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(
        /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number format (e.g., +1 (123) 456-7890)"
      )
      .required("Phone number is required"),

    address: Yup.string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address must be less than 100 characters")
      .required("Address is required"),

    aptSuite: Yup.string()
      .trim()
      .max(10, "Apt/Suite must be less than 10 characters")
      .nullable(),

    city: Yup.string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .required("City is required"),

    state: Yup.string()
      .trim()
      .length(2, "State must be a valid 2-letter abbreviation")
      .required("State is required"),

    zipCode: Yup.string()
      .matches(
        /^\d{5}(-\d{4})?$/,
        "Invalid ZIP code format (e.g., 12345 or 12345-6789)"
      )
      .required("ZIP Code is required"),

    debtRange: Yup.string()
      .oneOf(
        ["<50000", "50000-75000", "75000-100000", ">100000"],
        "Invalid debt range selection"
      )
      .required("Debt range is required"),

    agreeTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "auto",
    maxWidth: "600px",
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Fill out the form
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Submitted:", values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Grid2 container spacing={2}>
                  <Grid2 item xs={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      fullWidth
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <TextField
                      name="phone"
                      label="Phone"
                      fullWidth
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <TextField
                      name="email"
                      label="Email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <Field
                      as={TextField}
                      name="address"
                      label="Address"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <Field
                      as={TextField}
                      name="aptSuite"
                      label="Apt/Suite"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 item xs={6}>
                    <Field as={TextField} name="city" label="City" fullWidth />
                  </Grid2>
                  <FormControl fullWidth>
                    <InputLabel id="state">State</InputLabel>
                    <Select
                      labelId="state"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {getStates().map((state) => (
                        <MenuItem key={state.value} value={state.value}>
                          {state.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Grid2 item xs={6}>
                    <Field
                      as={TextField}
                      name="zipCode"
                      label="Zip Code"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <FormControl
                      fullWidth
                      error={touched.debtRange && Boolean(errors.debtRange)}
                    >
                      <InputLabel id="debtRange-label">Debt Range</InputLabel>
                      <Select
                        labelId="debtRange-label"
                        name="debtRange"
                        value={values.debtRange}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="<50000">Less than 50,000</MenuItem>
                        <MenuItem value="50000-75000">50,000 - 75,000</MenuItem>
                        <MenuItem value="75000-100000">
                          75,000 - 100,000
                        </MenuItem>
                        <MenuItem value=">100000">
                          Greater than 100,000
                        </MenuItem>
                      </Select>
                      {touched.debtRange && errors.debtRange && (
                        <Typography color="error" variant="caption">
                          {errors.debtRange}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid2>
                  <Grid2 item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeTerms"
                          checked={values.agreeTerms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      }
                      label="I agree to the Terms and Conditions"
                    />
                    {touched.agreeTerms && errors.agreeTerms && (
                      <Typography color="error" variant="caption">
                        {errors.agreeTerms}
                      </Typography>
                    )}
                  </Grid2>
                  <Grid2 item xs={12} sx={{ mt: 2, textAlign: "center" }}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ApplyModal;
