import React, { Suspense, useState } from "react";
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
} from "@mui/material";
import {
  Restaurant,
  Schedule,
  LocalDining,
  Download,
  Fullscreen,
  Close,
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
                      href="https://www.kitchonapp.ca/ordering/restaurant/menu?restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312"
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
                        href="https://www.kitchonapp.ca/ordering/restaurant/menu?restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312"
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
              href="https://www.kitchonapp.ca/ordering/restaurant/menu?restaurant_uid=29e4ef84-c523-4a58-9e4b-6546d6637312"
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
    </Box>
  );
};

export default Home;
