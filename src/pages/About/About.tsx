import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  useTheme,
} from "@mui/material";
import { History, People, LocationOn, Restaurant } from "@mui/icons-material";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const theme = useTheme();

  const values = [
    {
      icon: <History sx={{ fontSize: 48 }} />,
      title: "Our Heritage",
      description:
        "Serving the Whitby community with traditional pub fare and warm hospitality for years.",
    },
    {
      icon: <People sx={{ fontSize: 48 }} />,
      title: "Community First",
      description:
        "We believe in bringing people together over great food and drinks in a welcoming atmosphere.",
    },
    {
      icon: <Restaurant sx={{ fontSize: 48 }} />,
      title: "Quality Food",
      description:
        "Fresh ingredients, traditional recipes, and modern techniques create our signature dishes.",
    },
    {
      icon: <LocationOn sx={{ fontSize: 48 }} />,
      title: "Local Pride",
      description:
        "Proudly serving Baldwin Street and the greater Whitby area with dedication and care.",
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
          overflow: "hidden",
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
              About Brooklin Pub & Grill
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                opacity: 0.9,
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Your neighborhood gathering place in the heart of Whitby
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Story Section */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 8, xl: 10 },
          px: { xs: 2, md: 4, xl: 6 },
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  color: theme.palette.primary.main,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: theme.palette.text.primary,
                }}
              >
                Nestled in the heart of Whitby at 15 Baldwin Street, Brooklin
                Pub & Grill has been a cornerstone of the community, bringing
                people together over exceptional food and drinks. Our commitment
                to quality and hospitality has made us a favorite destination
                for locals and visitors alike.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: theme.palette.text.primary,
                }}
              >
                We pride ourselves on creating a warm, welcoming atmosphere
                where families can enjoy a meal together, friends can catch up
                over drinks, and everyone feels like they're part of our
                extended family. Our menu features both classic pub favorites
                and innovative dishes that celebrate the best of Canadian
                cuisine.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: theme.palette.text.primary,
                }}
              >
                At Brooklin Pub & Grill, we're more than just a restaurant –
                we're a gathering place where memories are made, celebrations
                happen, and the community comes together.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                component="img"
                src="/images/brooklinpub-logo.png"
                alt="Brooklin Pub Logo"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: "auto",
                  mx: "auto",
                  display: "block",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                mb: 6,
                color: theme.palette.primary.main,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              What We Stand For
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      p: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ color: theme.palette.primary.main, mb: 3 }}>
                        {value.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Statement */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: "bold",
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                opacity: 0.95,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              "To create an exceptional dining experience that brings our
              community together through outstanding food, genuine hospitality,
              and a warm, welcoming atmosphere that makes everyone feel at
              home."
            </Typography>
          </Paper>
        </motion.div>
      </Container>

      {/* Location Highlight */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                mb: 4,
                color: theme.palette.primary.main,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              Visit Us
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                mb: 3,
                color: theme.palette.text.primary,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
              }}
            >
              15 Baldwin Street, Whitby, ON L1M 1A2
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Located in the heart of Whitby, we're easily accessible and ready
              to welcome you for an unforgettable dining experience. Whether
              you're joining us for lunch, dinner, or just drinks with friends,
              we look forward to serving you.
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
