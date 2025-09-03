import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  // TikTok SVG icon
  const TikTokIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12.5 2c.41 0 .75.34.75.75v13.5a3.25 3.25 0 1 1-3.25-3.25c.41 0 .75.34.75.75s-.34.75-.75.75a1.75 1.75 0 1 0 1.75 1.75V4.5c0-.41.34-.75.75-.75zM16.5 5c.41 0 .75.34.75.75v.5c0 2.07 1.68 3.75 3.75 3.75.41 0 .75.34.75.75s-.34.75-.75.75c-2.07 0-3.75-1.68-3.75-3.75v-.5c0-.41.34-.75.75-.75z" />
    </SvgIcon>
  );
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        py: { xs: 3, md: 4, xl: 2 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ minHeight: 0 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box
                  component="img"
                  src="/images/brooklinpub-logo.png"
                  alt="Brooklin Pub Logo"
                  sx={{
                    height: 40,
                    mr: 2,
                    // Safari-specific fixes
                    WebkitBackfaceVisibility: "hidden",
                    WebkitTransform: "translateZ(0)",
                    WebkitAppearance: "none",
                    border: "none",
                    outline: "none",
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  Brooklin Pub & Grill
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Experience the best pub dining in Whitby. Great food, great
                atmosphere, great times!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  textAlign: { xs: "center", md: "left" },
                  fontStyle: "italic",
                }}
              >
                Happy-hour food • Great cocktails • Live music
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <IconButton
                  component={Link}
                  href="https://web.facebook.com/brooklinpub?_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "white" }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://www.instagram.com/brooklinpubngrill/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "white" }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://www.tiktok.com/@brooklinpubngrill"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "white" }}
                >
                  <TikTokIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Contact Info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <LocationOn sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">
                  15 Baldwin St, Whitby, ON L1M 1A2
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Phone sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">+1 905-425-3055</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Email sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">brooklinpub@gmail.com</Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Opening Hours
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Sunday - Thursday: 11 AM - 11 PM
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Friday - Saturday: 11 AM - 1 AM
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
                <Link href="/about" color="inherit" underline="hover">
                  About Us
                </Link>
                <Link href="/menu" color="inherit" underline="hover">
                  Menu
                </Link>
                <Link href="/specials" color="inherit" underline="hover">
                  Specials
                </Link>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact Us
                </Link>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            © 2025 BROOKLINPUB. ALL RIGHTS RESERVED
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            Website design by{" "}
            <Link
              href="https://akvisionsystems.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ textDecoration: "underline" }}
            >
              AK Vision Systems
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
