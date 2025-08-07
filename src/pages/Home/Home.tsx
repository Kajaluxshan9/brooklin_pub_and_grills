import React, { Suspense } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Restaurant, Schedule, LocalDining, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PubScene } from "../../components/Three/PubScene";

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Restaurant sx={{ fontSize: 40 }} />,
      title: "Authentic Pub Food",
      description:
        "Traditional pub favorites made with fresh, quality ingredients",
    },
    {
      icon: <LocalDining sx={{ fontSize: 40 }} />,
      title: "Daily Specials",
      description: "Exciting new dishes and deals every day of the week",
    },
    {
      icon: <Schedule sx={{ fontSize: 40 }} />,
      title: "Extended Hours",
      description: "Open late to serve you delicious food and drinks",
    },
    {
      icon: <Star sx={{ fontSize: 40 }} />,
      title: "Award Winning",
      description: "Recognized for excellence in food and service",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: { xs: "90vh", md: "95vh", xl: "90vh" },
          minHeight: { xs: "600px", md: "700px", xl: "750px" },
          maxHeight: { xs: "800px", md: "900px", xl: "900px" },
          background: `linear-gradient(
            135deg,
            ${theme.palette.primary.main}20 0%,
            ${theme.palette.secondary.main}20 100%
          )`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* 3D Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <Canvas>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <PubScene />
            </Canvas>
          </Suspense>
        </Box>

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, md: 4, xl: 6 },
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem", xl: "4.5rem" },
                    fontWeight: "bold",
                    mb: { xs: 2, xl: 3 },
                    color: theme.palette.primary.main,
                    lineHeight: { xs: 1.2, xl: 1.1 },
                  }}
                >
                  Welcome to Brooklin Pub & Grill
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 3, xl: 4 },
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "1.2rem", md: "1.5rem", xl: "1.8rem" },
                    lineHeight: { xs: 1.4, xl: 1.3 },
                  }}
                >
                  Your neighborhood pub in Whitby, Ontario
                </Typography>

                {/* Coming Soon Section */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    Official Website Coming Soon!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    We're working hard to bring you an amazing new web
                    experience with enhanced features and better functionality.
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    ✨ Happy-hour food • Great cocktails • Live music ✨
                  </Typography>
                </Paper>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                      href="https://www.kitchonapp.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order Online Now 🍕
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                      href="/menu"
                    >
                      View Menu
                    </Button>
                  </motion.div>
                </Box>
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
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 6, color: theme.palette.primary.main }}
          >
            Why Choose Brooklin Pub?
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{ mb: 4, color: theme.palette.primary.main }}
            >
              Our Partners
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ mb: 4, color: theme.palette.text.secondary }}
            >
              We're proud to work with amazing local partners who help us serve
              you better
            </Typography>

            {/* Partner logos would go here - placeholder for now */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 4,
                minHeight: 120,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                p: 4,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Partner logos will be displayed here
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
              Ready to Dine With Us?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Visit us at 15 Baldwin St, Whitby or order online for pickup and
              delivery
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "black",
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
              href="https://www.kitchonapp.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online Now
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
