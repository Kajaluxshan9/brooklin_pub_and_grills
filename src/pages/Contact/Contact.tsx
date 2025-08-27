import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  IconButton,
  useTheme,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Facebook,
  Instagram,
  Send,
} from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import type { SelectChangeEvent } from "@mui/material";

const Contact: React.FC = () => {
  // TikTok SVG icon
  const TikTokIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12.5 2c.41 0 .75.34.75.75v13.5a3.25 3.25 0 1 1-3.25-3.25c.41 0 .75.34.75.75s-.34.75-.75.75a1.75 1.75 0 1 0 1.75 1.75V4.5c0-.41.34-.75.75-.75zM16.5 5c.41 0 .75.34.75.75v.5c0 2.07 1.68 3.75 3.75 3.75.41 0 .75.34.75.75s-.34.75-.75.75c-2.07 0-3.75-1.68-3.75-3.75v-.5c0-.41.34-.75.75-.75z" />
    </SvgIcon>
  );
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

const contactCategories = [
  { value: "party-hall", label: "Party Hall Booking" },
  { value: "general-info", label: "General Inquiry" },
  { value: "feedback", label: "Share Your Feedback" },
];


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error("Name is required.");
    }
    if (formData.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long.");
    }
    if (!formData.email.trim()) {
      throw new Error("Email is required.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!formData.category) {
      throw new Error("Please select a category for your inquiry.");
    }
    if (!formData.message.trim()) {
      throw new Error("Message is required.");
    }
    if (formData.message.trim().length < 10) {
      throw new Error("Message must be at least 10 characters long.");
    }
    if (
      formData.phone &&
      formData.phone.trim() &&
      !/^[\d\s\-+()]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      throw new Error("Please enter a valid phone number.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setShowAlert(false);

    try {
      validateForm();

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          category: formData.category,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setAlertMessage(
          responseData.message ||
            "Message sent successfully! We'll get back to you soon."
        );
        setAlertSeverity("success");
        setShowAlert(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          category: "",
        });
      } else {
        throw new Error(
          responseData.message || "Failed to send message. Please try again."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending message:", error);
        setAlertMessage(error.message);
      } else {
        console.error("Unexpected error:", error);
        setAlertMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      setAlertSeverity("error");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowAlert(false), 8000);
    }
  };

  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: "Visit Us",
      details: ["15 Baldwin St", "Whitby, ON L1M 1A2"],
      color: "#E74C3C",
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: "Call Us",
      details: ["+1 905-425-3055"],
      color: "#A0522D",
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: "Email Us",
      details: ["brooklinpub@gmail.com", "We respond within 24 hours"],
      color: "#2ECC71",
    },
    {
      icon: <Schedule sx={{ fontSize: 40 }} />,
      title: "Hours",
      details: [
        "Mon-Thu: 11 AM - 11 PM",
        "Fri-Sat: 11 AM - 12 AM",
        "Sun: 11 AM - 11 PM",
      ],
      color: "#F39C12",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: 8,
          position: "relative",
          minHeight: "60vh", // match hero height with other pages
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4, xl: 6 } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              textAlign="center"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", xl: "4.2rem" },
                fontWeight: "bold",
                mb: { xs: 3, xl: 4 },
                lineHeight: { xs: 1.2, xl: 1.1 },
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                opacity: 0.9,
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Get in touch with us for reservations, questions, or feedback
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Information Cards */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 8, xl: 10 },
          px: { xs: 2, md: 4, xl: 6 },
        }}
      >
        <Grid container spacing={{ xs: 4, xl: 6 }} justifyContent="center">
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} xl={2.4} key={info.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: info.color,
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form and Map Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 3,
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Send Us a Message
                  </Typography>

                  {showAlert && (
                    <Alert severity={alertSeverity} sx={{ mb: 3 }}>
                      {alertMessage}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required variant="outlined">
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={formData.category}
                            onChange={handleCategoryChange}
                            label="Category"
                          >
                            {contactCategories.map((category) => (
                              <MenuItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={
                            isSubmitting ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              <Send />
                            )
                          }
                          disabled={isSubmitting}
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            px: 4,
                            py: 1.5,
                            fontSize: "1.1rem",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.dark,
                            },
                            "&:disabled": {
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Map and Additional Info */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Map Placeholder */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    mb: 4,
                    textAlign: "center",
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: 3,
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps?q=15+Baldwin+St,+Whitby,+ON+L1M+1A2&output=embed"
                    width="100%"
                    height="100%"
                    className={styles.iframeStyles}
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Brooklin Pub & Grills Location"
                  >
                    <p>
                      Your browser does not support iframes. Please visit{" "}
                      <a href="https://www.google.com/maps?q=15+Baldwin+St,+Whitby,+ON+L1M+1A2">
                        Google Maps
                      </a>{" "}
                      for the location.
                    </p>
                  </iframe>
                </Paper>

                {/* Social Media */}
                <Paper
                  elevation={3}
                  sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Follow Us
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                  >
                    <IconButton
                      href="https://web.facebook.com/brooklinpub?_rdc=1&_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "#1877F2",
                        color: "white",
                        "&:hover": { backgroundColor: "#166FE5" },
                      }}
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      href="https://www.instagram.com/brooklinpubngrill/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "#E4405F",
                        color: "white",
                        "&:hover": { backgroundColor: "#D6336C" },
                      }}
                    >
                      <Instagram />
                    </IconButton>
                    <IconButton
                      href="https://www.tiktok.com/@brooklinpubngrill"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "#000",
                        color: "white",
                        "&:hover": { backgroundColor: "#222" },
                      }}
                    >
                      <TikTokIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, color: theme.palette.text.secondary }}
                  >
                    Stay updated with our latest specials and events!
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Emergency Info */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Need Immediate Assistance?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              For urgent matters or same-day reservations, please call us
              directly at +1 905-425-3055
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              href="tel:+19054253055"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Call Now
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
