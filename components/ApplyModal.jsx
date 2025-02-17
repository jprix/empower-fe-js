import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getStates } from "../helpers/getStates";

const ApplyModal = ({ open, onClose }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    debtRange: "",
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
    city: Yup.string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .required("City is required"),
    state: Yup.string().required("State is required"),
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
    agreeTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Submitted Successfully:", values);
    alert("Form Submitted Successfully");
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      onClose(); // Assuming onClose is passed to close the modal
    }, 500);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Modal Header with Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#000000",
            color: "white",
            p: 2,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <Typography variant="h6" sx={{ color: "var(--color-secondary)" }}>
            Apply Now
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal Content */}
        <Box sx={{ p: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={false}
            validateOnChange={true}
            validateOnMount={true}
            validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              isValid,
              setSubmitting,
              dirty,
            }) => (
              <Form
                onSubmit={() =>
                  handleSubmit(values, isSubmitting, setSubmitting)
                }
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="address"
                      label="Address"
                      fullWidth
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="city"
                      label="City"
                      fullWidth
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="zipCode"
                      label="Zip Code"
                      fullWidth
                      value={values.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.zipCode && Boolean(errors.zipCode)}
                      helperText={touched.zipCode && errors.zipCode}
                    />
                  </Grid>

                  {/* State Dropdown */}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                      >
                        {getStates().map((state) => (
                          <MenuItem key={state.value} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Debt Range Dropdown */}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Debt Range</InputLabel>
                      <Select
                        name="debtRange"
                        value={values.debtRange}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.debtRange && Boolean(errors.debtRange)}
                        helperText={touched.debtRange && errors.debtRange}
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
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeTerms"
                          checked={values.agreeTerms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.agreeTerms && Boolean(errors.agreeTerms)
                          }
                          helperText={touched.agreeTerms && errors.agreeTerms}
                        />
                      }
                      label="I agree to the Terms and Conditions"
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "var(--color-secondary)",
                        color: "white",
                      }}
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default ApplyModal;
