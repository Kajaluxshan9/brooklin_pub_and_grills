import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Menu", path: "/menu" },
    { label: "Specials", path: "/specials" },
    { label: "Contact Us", path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2, right:10, }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" color="primary">
          Brooklin Pub & Grills
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? theme.palette.primary.light
                  : "transparent",
              borderRadius: 0,
              mb: 1,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <ListItemText
              primary={item.label}
              sx={{
                color: location.pathname === item.path ? "white" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src="/images/brooklinpub-logo.png"
                alt="Brooklin Pub Logo"
                sx={{ height: 50, marginRight: 2 }}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Brooklin Pub & Grill
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      position: "relative",
                      "&:hover .nav-underline": {
                        width: "100%",
                        opacity: 1,
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        component={Link}
                        to={item.path}
                        sx={{
                          color:
                            location.pathname === item.path
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                          fontWeight:
                            location.pathname === item.path ? "bold" : "normal",
                          position: "relative",
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {item.label}
                        {/* Hover underline */}
                        <Box
                          className="nav-underline"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: 2,
                            width: location.pathname === item.path ? "100%" : 0,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 0,
                            transition: "width 0.3s ease, opacity 0.3s ease",
                            opacity: location.pathname === item.path ? 1 : 0,
                          }}
                        />
                      </Button>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            height: "auto",
            minHeight: "fit-content",
            maxHeight: "80vh",
            top: "10%",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
