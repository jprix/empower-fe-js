import React, { use, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function RequestModal({ open, handleClose, onSubmit }) {
    const { user } = useDynamicContext();
    const [loading, setLoading] = useState(false); // Loading state to show spinner
    console.log('user', user);
    // Formik setup for form validation
    const formik = useFormik({
        initialValues: {
            name: user?.verifiedCredentials[2]?.oauthDisplayName || '',
            email: user?.email || '',
            address: '',
            userId: user?.userId
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Recipient name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            address: Yup.string().required('Address is required'),
            userId: Yup.string().required('User ID is required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true); // Show spinner on submit
            setSubmitting(false); // Stop Formik's automatic submission handling

            try {
                // Trigger the Temporal workflow by calling the API
                const response = await fetch('/api/temporal/workflow/start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Workflow started:', data.runId);
                } else {
                    console.error('Failed to start workflow');
                }
            } catch (error) {
                console.error('Error submitting request:', error);
            } finally {
                setLoading(false); // Stop loading
                handleClose(); // Close modal after the spinner animation
            }
        }
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    position: 'relative', // Important to position the close icon correctly
                    backgroundColor: '#ffffff' // Ensure background is white
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'var(--color-primary)', // Use the primary color for the close icon
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Request Proof of Funds
                </Typography>

                {loading ? (
                    // Show the spinner with the logo during loading
                    <>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                            <img
                                src="/empower-horizontal-logo.svg"
                                alt="Loading spinner"
                                className="w-40 h-40 animate-pulse" // Tailwind classes for spinner
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mt: 2 }}>Submitting request...</Typography>
                    </>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Buyer/Renter Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Buyer/Renter Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Property Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: 'var(--color-primary)', mt: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </Box>
        </Modal>
    );
}
