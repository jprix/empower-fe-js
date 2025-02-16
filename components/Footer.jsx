import React from 'react';
import { Box, Typography, Link, Grid2, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#000000', color: '#e6d193', padding: '40px 0', borderTop: '1px solid #e6d193', minHeight: '100vh' }}> 
            <Container maxWidth="lg">
                <Grid2 container spacing={2}>  
                    <Grid2 item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>Empower Financial Network</Typography>
                        <Typography variant="body2">P.O. Box 24</Typography>
                        <Typography variant="body2">Eastport, NY 11941</Typography>
                    </Grid2>
                    <Grid2 item xs={12} sm={2}>
                        <Typography variant="h6" gutterBottom>Quick Links</Typography>
                        <Link href="/home" color="inherit" underline="hover">Home</Link><br />
                        <Link href="/about-us" color="inherit" underline="hover">About Us</Link>
                    </Grid2>
                    <Grid2 item xs={12} sm={2}>
                        <Typography variant="h6" gutterBottom>Resources</Typography>
                        <Link href="/terms" color="inherit" underline="hover">Terms</Link><br />
                        <Link href="/privacy" color="inherit" underline="hover">Privacy</Link>
                    </Grid2>
                    <Grid2 item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>Contact Us</Typography>
                        <Typography variant="body2">Email: Marketing@EmpowerFN.com</Typography>
                        <Typography variant="body2">Phone: (866) 490-1617</Typography>
                    </Grid2>
                </Grid2>
                <Typography variant="body2" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>  
                    © 2025 Empower Financial Network. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
