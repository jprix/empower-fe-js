import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'; // For Next.js routing
import RequestModal from './RequestModal';
import { useIsLoggedIn, useDynamicContext, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router'; // Next.js router for manipulating URLs

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openDynamicWidget, setOpenDynamicWidget] = useState(false);
    const [isClient, setIsClient] = useState(false); // To check if we are on the client side

    const isLoggedIn = useIsLoggedIn(); // Check if the user is logged in
    const { handleLogOut, user, sdkHasLoaded, setShowAuthFlow, refreshUser } = useDynamicContext(); // Use DynamicContext
    const router = useRouter(); // Next.js router

    // Ensure the component is rendered on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    const handleLoginClick = () => {
        setOpenDynamicWidget(true); // Open the DynamicWidget for login
        setShowAuthFlow(true); // Trigger Dynamic OAuth flow
    };

    const handleLogoutClick = () => {
        handleLogOut(); // Log out using DynamicContext's handleLogOut
        setOpenDynamicWidget(false); // Optionally close the DynamicWidget
        localStorage.clear(); // Clear localStorage if any session data is stored
        router.push('/'); // Optionally redirect to the home page or login page after logout
    };

    const handleFormSubmit = (values) => {
        console.log('Form submitted:', values);
        handleCloseModal();
    };

    // Only render if the component is on the client side
    if (!isClient) {
        return null;
    }

    return (
        <>
            <AppBar
                position="static"
                sx={{ backgroundColor: '#000000', height: '86px' }}
                >
                <Toolbar sx={{ minHeight: '86px', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo */}
                    <IconButton edge="start" color='var(--color-text)' aria-label="logo">
                        <Link href="/" passHref>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img src="/empower-horizontal-logo.svg" alt="Logo" style={{ width: '160px', height: 'auto' }} />
                            </Box>
                        </Link>
                    </IconButton>

                    {/* Links for larger screens */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Link href="/verification" passHref>
                            <Typography sx={{ color: 'var(--color-secondary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}>
                                Verify
                            </Typography>
                        </Link>

                        <Link href="/contact-us" passHref>
                            <Typography sx={{ color: 'var(--color-secondary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}>
                                Contact Us
                            </Typography>
                        </Link>

                        {user ? (
                            <>
                                <Typography
                                    sx={{ color: 'var(--color-secondary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}
                                    onClick={handleOpenModal}
                                >
                                    Request
                                </Typography>
                                <Link href="/account" passHref>
                                    <Typography sx={{ color: 'var(--color-primary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}>
                                        {user.email || 'Account'}
                                    </Typography>
                                </Link>
                                <Typography
                                    sx={{ color: 'var(--color-primary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                sx={{ color: 'var(--color-secondary)', textDecoration: 'none', cursor: 'pointer', marginRight: 2 }}
                                onClick={handleLoginClick}
                            >
                                Login
                            </Typography>
                        )}
                    </Box>

                    {/* Hamburger menu for mobile */}
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ display: { xs: 'flex', md: 'none', color: 'var(--color-secondary)' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar >

            {/* Drawer for mobile navigation */}
            < Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose} >
                <Box
                    sx={{ width: 250, color: 'var(--color-secondary)' }}
                    role="presentation"
                    onClick={handleDrawerClose}
                >
                    <List>
                    <ListItem button component={Link} href="/verification" passHref>
                        <ListItemText primary="Verify" sx={{ color: 'var(--color-secondary)' }} />
                    </ListItem>
                    <ListItem button component={Link} href="/contact-us" passHref>
                        <ListItemText primary="Contact Us" sx={{ color: 'var(--color-primary)' }} />
                    </ListItem>
                    {user ? (
                        <>
                            <ListItem button onClick={handleOpenModal}>
                                <ListItemText primary="Request" sx={{ color: 'var(--color-primary)' }} />
                            </ListItem>
                            <ListItem button component={Link} href="/account" passHref>
                                <ListItemText primary={user.email || 'Account'} sx={{ color: 'var(--color-primary)' }} />
                            </ListItem>
                            <ListItem button onClick={handleLogoutClick}>
                                <ListItemText primary="Logout" sx={{ color: 'var(--color-primary)' }} />
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button onClick={handleLoginClick}>
                            <ListItemText primary="Login" sx={{ color: 'var(--color-primary)' }} />
                        </ListItem>
                    )}
                </List>

                </Box>
            </Drawer >

            {/* Dynamic Widget for login */}
            {
                openDynamicWidget && sdkHasLoaded && (
                    <DynamicWidget
                        onClose={() => setOpenDynamicWidget(false)} // Close DynamicWidget when login finishes
                    />
                )
            }

            {/* Request Modal */}
            {openModal && <RequestModal open={openModal} handleClose={handleCloseModal} onSubmit={handleFormSubmit} />}
        </>
    );
}
