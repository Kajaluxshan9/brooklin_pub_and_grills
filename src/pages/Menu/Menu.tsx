import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tab,
  Tabs,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  Close,
  Restaurant,
  Launch,
  Download,
  Fullscreen,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Menu: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0); // Default to "Primary" tab
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const menuImages = [
    {
      src: "/images/brooklin menu-page1.jpg",
      title: "Main Menu",
      category: "main",
    },
    {
      src: "/images/brooklin menu-page-2.jpg",
      title: "Main Menu",
      category: "main",
    },
    {
      src: "/images/set-dinner-menu.jpg",
      title: "Set Dinner Menu",
      category: "dinner",
    },
    {
      src: "/images/Catering-Menu-brooklin.jpg",
      title: "Catering Menu",
      category: "catering",
    },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const getFilteredImages = () => {
    switch (tabValue) {
      case 0:
        return menuImages; // "Primary" tab shows all menus
      case 1:
        return menuImages.filter((image) => image.category === "main");
      case 2:
        return menuImages.filter((image) => image.category === "dinner");
      case 3:
        return menuImages.filter((image) => image.category === "catering");
      default:
        return menuImages;
    }
  };

  const categories = ["main", "dinner", "catering"];

  // Removed custom scrollTabs logic to match Specials.tsx navigation style

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
              Our Menu
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
              Discover our delicious selection of pub favorites and specialty
              dishes
            </Typography>
          </motion.div>
        </Container>
      </Box>
      {/* Menu Categories */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 6, xl: 8 },
          px: { xs: 2, md: 4, xl: 6 },
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            alignItems: "center",
            justifyContent: "center", // Center tabs horizontally
            mb: 2,
            mx: "auto", // Center tabs for all screen sizes
            display: "flex", // Use flex for alignment
            width: "100%", // Ensure tabs span the container width
            maxWidth: "600px", // Limit width on larger screens
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              fontWeight: "bold",
              minWidth: 120,
              position: "relative",
              "&:hover": {
                color: theme.palette.primary.main,
                "&::after": {
                  width: "80%",
                  opacity: 0.6,
                },
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 2,
                backgroundColor: theme.palette.primary.main,
                transition: "width 0.3s ease, opacity 0.3s ease",
                opacity: 0,
              },
              "&.Mui-selected::after": {
                width: "100%",
                opacity: 1,
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label="Primary" />
          <Tab label="Main Menu" />
          <Tab label="Set Dinner" />
          <Tab label="Catering" />
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={tabValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabPanel value={tabValue} index={0}>
              {categories.map((category) => (
                <Box key={category} sx={{ mb: 6 }}>
                  <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{ mb: 4, color: theme.palette.primary.main }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)} Menu
                  </Typography>
                  <Grid container spacing={{ xs: 4, xl: 6 }}>
                    {menuImages
                      .filter((image) => image.category === category)
                      .map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={image.src}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card
                              sx={{
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                position: "relative",
                                "&:hover": {
                                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                  "& .overlay-icons": {
                                    opacity: 1,
                                  },
                                },
                              }}
                              onClick={() => handleImageClick(image.src)}
                            >
                              <CardMedia
                                component="img"
                                image={image.src}
                                alt={image.title}
                                sx={{
                                  height: "auto",
                                  minHeight: 200,
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
                                  opacity: { xs: 1, md: 0 }, // Always visible on mobile
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
                                    handleImageClick(image.src);
                                  }}
                                >
                                  <Fullscreen />
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
                                    const link = document.createElement("a");
                                    link.href = image.src;
                                    link.download = `${image.title}.jpg`;
                                    link.click();
                                  }}
                                >
                                  <Download />
                                </IconButton>
                              </Box>
                              <CardContent>
                                <Typography variant="h6" textAlign="center">
                                  {image.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  textAlign="center"
                                >
                                  Fresh ingredients, crafted with care
                                </Typography>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 4, color: theme.palette.primary.main }}
              >
                Main Menu
              </Typography>
              <Grid container spacing={{ xs: 4, xl: 6 }}>
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={image.src}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                            "& .overlay-icons": {
                              opacity: 1,
                            },
                          },
                        }}
                        onClick={() => handleImageClick(image.src)}
                      >
                        <CardMedia
                          component="img"
                          image={image.src}
                          alt={image.title}
                          sx={{
                            height: "auto",
                            minHeight: 200,
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
                            opacity: { xs: 1, md: 0 }, // Always visible on mobile
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
                              handleImageClick(image.src);
                            }}
                          >
                            <Fullscreen />
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
                              const link = document.createElement("a");
                              link.href = image.src;
                              link.download = `${image.title}.jpg`;
                              link.click();
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Box>
                        <CardContent>
                          <Typography variant="h6" textAlign="center">
                            {image.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                          >
                            Fresh ingredients, crafted with care
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 4, color: theme.palette.primary.main }}
              >
                Set Dinner Menu
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} md={8} lg={6} key={image.src}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                            "& .overlay-icons": {
                              opacity: 1,
                            },
                          },
                        }}
                        onClick={() => handleImageClick(image.src)}
                      >
                        <CardMedia
                          component="img"
                          image={image.src}
                          alt={image.title}
                          sx={{ height: 500, objectFit: "contain" }}
                        />
                        <Box
                          className="overlay-icons"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            display: "flex",
                            gap: 1,
                            opacity: 0,
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
                              handleImageClick(image.src);
                            }}
                          >
                            <Fullscreen />
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
                              const link = document.createElement("a");
                              link.href = image.src;
                              link.download = `${image.title}.jpg`;
                              link.click();
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Box>
                        <CardContent>
                          <Typography variant="h6" textAlign="center">
                            {image.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                          >
                            Complete dinner packages for special occasions
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 4, color: theme.palette.primary.main }}
              >
                Catering Menu
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} md={8} lg={6} key={image.src}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                            "& .overlay-icons": {
                              opacity: 1,
                            },
                          },
                        }}
                        onClick={() => handleImageClick(image.src)}
                      >
                        <CardMedia
                          component="img"
                          image={image.src}
                          alt={image.title}
                          sx={{ height: 500, objectFit: "contain" }}
                        />
                        <Box
                          className="overlay-icons"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            display: "flex",
                            gap: 1,
                            opacity: 0,
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
                              handleImageClick(image.src);
                            }}
                          >
                            <Fullscreen />
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
                              const link = document.createElement("a");
                              link.href = image.src;
                              link.download = `${image.title}.jpg`;
                              link.click();
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Box>
                        <CardContent>
                          <Typography variant="h6" textAlign="center">
                            {image.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                          >
                            Perfect for events and gatherings of all sizes
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </Container>
      {/* Order Online CTA */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, xl: 6 },
          px: { xs: 2, md: 4, xl: 6 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              p: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Restaurant sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              Ready to Order?
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Skip the wait and order online for pickup or delivery!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Launch />}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
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
          </Card>
        </motion.div>
      </Container>

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
              alt="Menu"
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

      {/* Bottom CTA */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4, xl: 6 } }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              Questions About Our Menu?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Contact us for dietary information, allergen details, or special
              requests
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "black",
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
              href="/contact"
            >
              Contact Us
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Menu;
