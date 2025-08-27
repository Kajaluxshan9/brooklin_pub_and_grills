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
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close,
  Home as HomeIcon,
  Info as InfoIcon,
  MenuBook as MenuBookIcon,
  LocalOffer as LocalOfferIcon,
  ContactMail as ContactMailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
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
    <Box
      sx={{
        width: "100%",
        maxWidth: 320,
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="/images/brooklinpub-logo.png"
            alt="logo"
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Brooklin Pub & Grill
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Whitby • Local Eats
            </Typography>
          </Box>
        </Box>
        <IconButton aria-label="close menu" onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const getIcon = () => {
            switch (item.label.toLowerCase()) {
              case "home":
                return <HomeIcon />;
              case "about us":
                return <InfoIcon />;
              case "menu":
                return <MenuBookIcon />;
              case "specials":
                return <LocalOfferIcon />;
              case "contact us":
                return <ContactMailIcon />;
              default:
                return <MenuIcon />;
            }
          };

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                py: 1.75,
                px: 1.5,
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : "transparent",
                color: isActive ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: isActive
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "white" : theme.palette.primary.main,
                  minWidth: 40,
                }}
              >
                {getIcon()}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: isActive ? "bold" : 600 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 2 }}>
        <Divider />
        <Box
          sx={{ display: "flex", gap: 1.5, mt: 1, justifyContent: "center" }}
        >
          <IconButton
            aria-label="facebook"
            size="large"
            href="#"
            sx={{ color: theme.palette.primary.main }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            aria-label="instagram"
            size="large"
            href="#"
            sx={{ color: theme.palette.primary.main }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
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
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "95%",
            height: "10vh",
            mx: "auto",
            px: { xs: 2, md: 6 },
          }}
        >
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
            <motion.div whileTap={{ scale: 0.92 }}>
              <IconButton
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: mobileOpen ? 90 : 0,
                    scale: mobileOpen ? 0.95 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {mobileOpen ? <Close /> : <MenuIcon />}
                </motion.div>
              </IconButton>
            </motion.div>
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
          zIndex: (theme) => theme.zIndex.drawer + 2,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
            maxWidth: 320,
            height: "100vh",
            borderRadius: "12px 0 0 12px",
            padding: 2,
            background: theme.palette.background.paper,
            boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>{drawer}</Box>
        </motion.div>
      </Drawer>
    </>
  );
};

export default Header;
