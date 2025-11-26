import React, { Suspense, useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
  Fade,
} from "@mui/material";
import {
  Restaurant,
  Schedule,
  LocalDining,
  Download,
  Fullscreen,
  Close,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
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
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showLandingPopup, setShowLandingPopup] = useState(false);
  const [currentPopupImageIndex, setCurrentPopupImageIndex] = useState(0);

  // Popup images array
  const popupImages = [
    {
      src: "/images/popup-image.jpg",
      alt: "Special Offer - Order Online",
      link: "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true",
    },
    {
      src: "/images/2026 - New year.jpg",
      alt: "New Year 2026 Celebration",
      link: "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true",
    },
  ];

  // Landing popup logic - show on every page load/refresh
  useEffect(() => {
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setShowLandingPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate popup images every 5 seconds
  useEffect(() => {
    if (!showLandingPopup) return;

    const rotationTimer = setInterval(() => {
      setCurrentPopupImageIndex(
        (prevIndex) => (prevIndex + 1) % popupImages.length
      );
    }, 5000); // 5 seconds

    return () => clearInterval(rotationTimer);
  }, [showLandingPopup, popupImages.length]);

  const handleCloseLandingPopup = () => {
    setShowLandingPopup(false);
    setCurrentPopupImageIndex(0); // Reset to first image when closed
  };

  const handleLandingPopupClick = () => {
    const currentImage = popupImages[currentPopupImageIndex];
    window.open(currentImage.link, "_blank");
    handleCloseLandingPopup();
  };

  const handleNextPopupImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPopupImageIndex(
      (prevIndex) => (prevIndex + 1) % popupImages.length
    );
  };

  const handlePrevPopupImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPopupImageIndex((prevIndex) =>
      prevIndex === 0 ? popupImages.length - 1 : prevIndex - 1
    );
  };

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
  ];

  // Weekly specials data
  const weeklySpecials = [
    {
      src: "/images/monday brooklin.jpg",
      title: "Monday Specials",
      day: "Monday",
    },
    {
      src: "/images/tuesday brooklin.jpg",
      title: "Tuesday Specials",
      day: "Tuesday",
    },
    {
      src: "/images/wednesday brooklin.jpg",
      title: "Wednesday Specials",
      day: "Wednesday",
    },
    {
      src: "/images/thursday brooklin.jpg",
      title: "Thursday Specials",
      day: "Thursday",
    },
    {
      src: "/images/friday brooklin.jpg",
      title: "Friday Specials",
      day: "Friday",
    },
    {
      src: "/images/sat-sun brooklin.jpg",
      title: "Weekend Specials",
      day: "Saturday & Sunday",
    },
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <Box>
      {/* Hero Section with Responsive Layout */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: `linear-gradient(
            135deg,
            ${theme.palette.primary.main}20 0%,
            ${theme.palette.secondary.main}20 100%
          )`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          py: { xs: 4, sm: 6, md: 8 },
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
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          {/* Mobile Layout - Logo at Top */}
          {isMobile && (
            <Box sx={{ mb: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    mb: 4,
                  }}
                >
                  <OptimizedImage
                    src="/images/brooklinpub-logo.png"
                    alt="Brooklin Pub & Grill Logo"
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 280, sm: 350 },
                      height: "auto",
                      mx: "auto",
                      display: "block",
                      filter: "drop-shadow(0 4px 15px rgba(0,0,0,0.3))",
                      // Safari-specific fixes
                      WebkitBackfaceVisibility: "hidden",
                      WebkitTransform: "translateZ(0)",
                      WebkitAppearance: "none",
                      border: "none",
                      outline: "none",
                      "&::-webkit-focus-ring-color": {
                        color: "transparent",
                      },
                    }}
                  />
                </Box>
              </motion.div>

              {/* Mobile Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem" },
                    fontWeight: "bold",
                    mb: 2,
                    color: theme.palette.primary.main,
                    lineHeight: 1.2,
                    textAlign: "center",
                  }}
                >
                  Welcome to Brooklin Pub & Grill
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}
                >
                  Your neighborhood pub in Whitby, Ontario
                </Typography>

                {/* Coming Soon Section - Mobile */}
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
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
                      textAlign: "center",
                    }}
                  >
                    Official Website Coming Soon!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      textAlign: "center",
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
                      textAlign: "center",
                    }}
                  >
                    ✨ Happy-hour food • Great cocktails • Live music ✨
                  </Typography>
                </Paper>

                {/* Mobile Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "row" },
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      fullWidth={isSmallMobile}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        px: 2,
                        py: 1.5,
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                      href="https://www.eastserve.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
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
                      fullWidth={isSmallMobile}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        px: 2,
                        py: 1.5,
                        fontSize: "1rem",
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
            </Box>
          )}

          {/* Desktop/Tablet Layout - Logo on Right */}
          {!isMobile && (
            <Grid
              container
              spacing={{ md: 6, lg: 8, xl: 10 }}
              alignItems="center"
              sx={{ minHeight: "70vh" }}
            >
              {/* Content Column - Left Side */}
              <Grid item md={6} lg={7}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        md: "2.8rem",
                        lg: "3.5rem",
                        xl: "4.5rem",
                      },
                      fontWeight: "bold",
                      mb: { md: 3, lg: 4 },
                      color: theme.palette.primary.main,
                      lineHeight: { md: 1.2, lg: 1.1 },
                    }}
                  >
                    Welcome to Brooklin Pub & Grill
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: { md: 3, lg: 4 },
                      color: theme.palette.text.secondary,
                      fontSize: {
                        md: "1.3rem",
                        lg: "1.5rem",
                        xl: "1.8rem",
                      },
                      lineHeight: 1.3,
                    }}
                  >
                    Your neighborhood pub in Whitby, Ontario
                  </Typography>

                  {/* Coming Soon Section - Desktop */}
                  <Paper
                    elevation={3}
                    sx={{
                      p: { md: 3, lg: 4 },
                      mb: { md: 3, lg: 4 },
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                      borderRadius: 2,
                      maxWidth: { lg: "90%" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: { md: "1.2rem", lg: "1.3rem" },
                      }}
                    >
                      Official Website Coming Soon!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        fontSize: { md: "1rem", lg: "1.1rem" },
                        lineHeight: 1.4,
                      }}
                    >
                      We're working hard to bring you an amazing new web
                      experience with enhanced features and better
                      functionality.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        fontSize: { md: "0.9rem", lg: "1rem" },
                      }}
                    >
                      ✨ Happy-hour food • Great cocktails • Live music ✨
                    </Typography>
                  </Paper>

                  {/* Desktop Action Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
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
                          px: { md: 4, lg: 5 },
                          py: { md: 1.5, lg: 2 },
                          fontSize: { md: "1.1rem", lg: "1.2rem" },
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                        href="https://www.eastserve.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
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
                          px: { md: 4, lg: 5 },
                          py: { md: 1.5, lg: 2 },
                          fontSize: { md: "1.1rem", lg: "1.2rem" },
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

              {/* Logo Column - Right Side */}
              <Grid item md={6} lg={5}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <OptimizedImage
                      src="/images/brooklinpub-logo.png"
                      alt="Brooklin Pub & Grill Logo"
                      sx={{
                        width: "100%",
                        maxWidth: {
                          md: 400,
                          lg: 500,
                          xl: 600,
                        },
                        height: "auto",
                        mx: "auto",
                        display: "block",
                        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.3))",
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          )}
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
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
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
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
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

      {/* Weekly Specials Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          py: { xs: 6, md: 8 },
        }}
      >
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
              Weekly Specials
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
              Amazing deals every day of the week - don't miss out!
            </Typography>

            <Grid container spacing={4}>
              {weeklySpecials.slice(0, 6).map((special, index) => (
                <Grid item xs={12} sm={6} lg={4} key={special.src}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          "& .overlay-icons": {
                            opacity: 1,
                          },
                        },
                      }}
                      onClick={() => handleImageClick(special.src)}
                    >
                      <CardMedia
                        component="img"
                        image={special.src}
                        alt={special.title}
                        sx={{
                          height: { xs: 250, sm: 300 },
                          objectFit: "contain",
                          width: "100%",
                        }}
                      />
                      <Box
                        className="overlay-icons"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 1,
                          opacity: { xs: 1, md: 0 },
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.9)",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const link = document.createElement("a");
                            link.href = special.src;
                            link.download = `${special.title}.jpg`;
                            link.click();
                          }}
                        >
                          <Download />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.9)",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(special.src);
                          }}
                        >
                          <Fullscreen />
                        </IconButton>
                      </Box>
                      <CardContent>
                        <Typography
                          variant="h6"
                          textAlign="center"
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {special.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                        >
                          {special.day}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to="/specials"
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
                >
                  View All Specials
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

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
              href="https://www.eastserve.ca/ordering/restaurant/menu?company_uid=f0d6a7d8-6663-43c6-af55-0d11a9773920&restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312&facebook=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Image Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <Close />
          </IconButton>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Weekly Special"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Landing Popup Dialog */}
      <Dialog
        open={showLandingPopup}
        onClose={handleCloseLandingPopup}
        maxWidth={false}
        fullWidth={false}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: 3,
            overflow: "visible",
            width: {
              xs: "95vw", // 95% of viewport width on mobile
              sm: "85vw", // 85% on small tablets
              md: "75vw", // 75% on tablets
              lg: "65vw", // 65% on desktops
              xl: "55vw", // 55% on large desktops
            },
            maxWidth: {
              xs: "400px", // Max 400px on mobile
              sm: "500px", // Max 500px on small tablets
              md: "650px", // Max 650px on tablets
              lg: "750px", // Max 750px on desktops
              xl: "850px", // Max 850px on large desktops
            },
            height: "auto",
            maxHeight: {
              xs: "70vh", // Max 70% of viewport height on mobile
              sm: "75vh", // Max 75% on small tablets
              md: "80vh", // Max 80% on tablets
              lg: "85vh", // Max 85% on desktops
              xl: "90vh", // Max 90% on large desktops
            },
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            cursor: currentPopupImageIndex === 0 ? "pointer" : "default",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              transform: currentPopupImageIndex === 0 ? "scale(1.02)" : "none",
              transition: "transform 0.3s ease",
            },
          }}
          onClick={
            currentPopupImageIndex === 0 ? handleLandingPopupClick : undefined
          }
        >
          {/* Close Button */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleCloseLandingPopup();
            }}
            sx={{
              position: "absolute",
              top: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              backgroundColor: theme.palette.primary.main,
              color: "white",
              zIndex: 3,
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Close sx={{ fontSize: { xs: 16, sm: 18 } }} />
          </IconButton>

          {/* Previous Button */}
          {popupImages.length > 1 && (
            <IconButton
              onClick={handlePrevPopupImage}
              sx={{
                position: "absolute",
                left: { xs: 4, sm: 8, md: 12 },
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                zIndex: 3,
                width: { xs: 30, sm: 36, md: 40 },
                height: { xs: 30, sm: 36, md: 40 },
                backdropFilter: "blur(4px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            </IconButton>
          )}

          {/* Next Button */}
          {popupImages.length > 1 && (
            <IconButton
              onClick={handleNextPopupImage}
              sx={{
                position: "absolute",
                right: { xs: 4, sm: 8, md: 12 },
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                zIndex: 3,
                width: { xs: 30, sm: 36, md: 40 },
                height: { xs: 30, sm: 36, md: 40 },
                backdropFilter: "blur(4px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            </IconButton>
          )}

          {/* Image */}
          <Box
            component="img"
            src={popupImages[currentPopupImageIndex].src}
            alt={popupImages[currentPopupImageIndex].alt}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: {
                xs: "55vh",
                sm: "60vh",
                md: "65vh",
                lg: "70vh",
                xl: "75vh",
              },
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: 3,
              display: "block",
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // Fallback if image doesn't exist
              e.currentTarget.src = "/images/brooklinpub-logo.png";
            }}
          />

          {/* Pagination Dots */}
          {popupImages.length > 1 && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "absolute",
                bottom: { xs: 40, sm: 50, md: 55 },
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: { xs: 1, sm: 1.5 },
                zIndex: 3,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.75, sm: 1 },
                borderRadius: 5,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {popupImages.map((_, index) => (
                <Box
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPopupImageIndex(index);
                  }}
                  sx={{
                    width: { xs: 8, sm: 10, md: 12 },
                    height: { xs: 8, sm: 10, md: 12 },
                    borderRadius: "50%",
                    backgroundColor:
                      currentPopupImageIndex === index
                        ? theme.palette.primary.main
                        : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border:
                      currentPopupImageIndex === index
                        ? "2px solid white"
                        : "2px solid transparent",
                    "&:hover": {
                      backgroundColor:
                        currentPopupImageIndex === index
                          ? theme.palette.primary.light
                          : "rgba(255, 255, 255, 0.8)",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Caption */}
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: { xs: 8, sm: 10 },
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.7)",
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.25, sm: 0.5 },
              borderRadius: 1,
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              textAlign: "center",
              maxWidth: "85%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentPopupImageIndex === 0
              ? "Click to order online"
              : "Tap outside to close"}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Home;
