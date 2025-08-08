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
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Restaurant, Schedule, LocalDining, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PubScene } from "../../components/Three/PubScene";
import BrandCarousel from "../../components/BrandCarousel/BrandCarousel";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
          height: {
            xs: "100vh",
            sm: "90vh",
            md: "95vh",
            xl: "90vh",
          },
          minHeight: {
            xs: "700px",
            sm: "600px",
            md: "700px",
            xl: "750px",
          },
          maxHeight: {
            xs: "none",
            sm: "800px",
            md: "900px",
            xl: "900px",
          },
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
        {/* 3D Background - Only on desktop for better performance */}
        {!isMobile && (
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
        )}

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 3, md: 4, xl: 6 },
          }}
        >
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3.5rem",
                      xl: "4.5rem",
                    },
                    fontWeight: "bold",
                    mb: { xs: 1.5, sm: 2, xl: 3 },
                    color: theme.palette.primary.main,
                    lineHeight: { xs: 1.2, xl: 1.1 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Welcome to Brooklin Pub & Grill
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 2, sm: 3, xl: 4 },
                    color: theme.palette.text.secondary,
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                      md: "1.5rem",
                      xl: "1.8rem",
                    },
                    lineHeight: { xs: 1.4, xl: 1.3 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Your neighborhood pub in Whitby, Ontario
                </Typography>

                {/* Coming Soon Section */}
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: { xs: 2, sm: 3 },
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
                  >
                    Official Website Coming Soon!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    We're working hard to bring you an amazing new web
                    experience with enhanced features and better functionality.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    ✨ Happy-hour food • Great cocktails • Live music ✨
                  </Typography>
                </Paper>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
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
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                      href="https://www.kitchonapp.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order Online Now
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to="/menu"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                    >
                      View Menu
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: 3, md: 0 },
                  }}
                >
                  <OptimizedImage
                    src="/images/brooklinpub-logo.png"
                    alt="Brooklin Pub Logo"
                    loading="eager"
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 250, sm: 300, md: 400 },
                      height: "auto",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              mb: { xs: 4, md: 6 },
              color: theme.palette.primary.main,
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            }}
          >
            Why Choose Brooklin Pub?
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }}>
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
                    p: { xs: 2, md: 3 },
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
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Brand Partners Section */}
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
              sx={{
                mb: 2,
                color: theme.palette.primary.main,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              Our Premium Beverage Partners
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                px: { xs: 2, sm: 0 },
              }}
            >
              Featuring a curated selection of premium beers and beverages from
              world-renowned brands
            </Typography>

            <BrandCarousel />
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: { xs: 4, md: 6 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              Ready to Dine With Us?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                px: { xs: 2, sm: 0 },
              }}
            >
              Visit us at 15 Baldwin St, Whitby or order online for pickup and
              delivery
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "black",
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "1rem", md: "1.2rem" },
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
