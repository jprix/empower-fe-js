import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import RequestModal from "./RequestModal";
import { useRouter } from "next/router";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogoutClick = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleFormSubmit = (values) => {
    console.log("Form submitted:", values);
    handleCloseModal();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#000000", height: "86px" }}
      >
        <Toolbar
          sx={{
            minHeight: "86px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link href="/" passHref>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/empower-horizontal-logo.svg"
                  alt="Logo"
                  style={{ width: "160px", height: "auto" }}
                />
              </Box>
            </IconButton>
          </Link>

          {/* Links for larger screens */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link href="/verification" passHref>
              <Typography
                sx={{
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                  cursor: "pointer",
                  marginRight: 2,
                }}
              >
                Verify
              </Typography>
            </Link>

            <Link href="/contact" passHref>
              <Typography
                sx={{
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                  cursor: "pointer",
                  marginRight: 2,
                }}
              >
                Contact Us
              </Typography>
            </Link>
          </Box>

          {/* Hamburger menu for mobile */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "var(--color-secondary)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 250, color: "var(--color-secondary)" }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <List>
            <Link href="/verification" passHref>
              <ListItem button>
                <ListItemText
                  primary="Verify"
                  sx={{ color: "var(--color-secondary)" }}
                />
              </ListItem>
            </Link>
            <Link href="/contact" passHref>
              <ListItem button>
                <ListItemText
                  primary="Contact Us"
                  sx={{ color: "var(--color-primary)" }}
                />
              </ListItem>
            </Link>
            <ListItem>
              <ListItemText
                primary="Request"
                sx={{ color: "var(--color-primary)" }}
              />
            </ListItem>
            {/* If user is logged in */}
            <>
              <Link href="/account" passHref>
                <ListItem button>
                  <ListItemText
                    primary="Account"
                    sx={{ color: "var(--color-primary)" }}
                  />
                </ListItem>
              </Link>

              <ListItem button onClick={handleLogoutClick}>
                <ListItemText
                  primary="Logout"
                  sx={{ color: "var(--color-primary)" }}
                />
              </ListItem>
            </>
            {/* <ListItem button onClick={handleLoginClick}>
              <ListItemText
                primary="Login"
                sx={{ color: "var(--color-primary)" }}
              />
            </ListItem> */}
          </List>
        </Box>
      </Drawer>

      {/* Request Modal */}
      {openModal && (
        <RequestModal
          open={openModal}
          handleClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
