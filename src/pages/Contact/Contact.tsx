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
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS (you'll need to set up your EmailJS account)
      const serviceId = import.meta.env.SERVICE_ID;
      const templateId = import.meta.env.TEMPLATE_ID;
      const publicKey = import.meta.env.PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Fallback for demo - show success message
        setAlertMessage(
          "Thank you for your message! We'll get back to you soon."
        );
        setAlertSeverity("success");
        setShowAlert(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // Send email using EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
          publicKey
        );

        setAlertMessage(
          "Message sent successfully! We'll get back to you soon."
        );
        setAlertSeverity("success");
        setShowAlert(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setAlertMessage("Failed to send message. Please try again later.");
      setAlertSeverity("error");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowAlert(false), 5000);
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
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
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
                    style={{
                      border: 0,
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      maxWidth: "100%",
                      aspectRatio: "16/9",
                    }}
                    allowFullScreen=""
                    loading="lazy"
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
