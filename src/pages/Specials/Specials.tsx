import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Close,
  Schedule,
  LocalOffer,
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
      id={`specials-tabpanel-${index}`}
      aria-labelledby={`specials-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Specials: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0); // Default to "Primary" tab
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const specialsImages = [
    {
      src: "/images/all day everyday specials brooklin.jpg",
      title: "All Day Everyday Specials",
      category: "daily",
      day: "Everyday",
    },
    {
      src: "/images/monday brooklin.jpg",
      title: "Monday Specials",
      category: "weekly",
      day: "Monday",
    },
    {
      src: "/images/tuesday brooklin.jpg",
      title: "Tuesday Specials",
      category: "weekly",
      day: "Tuesday",
    },
    {
      src: "/images/wednesday brooklin.jpg",
      title: "Wednesday Specials",
      category: "weekly",
      day: "Wednesday",
    },
    {
      src: "/images/thursday brooklin.jpg",
      title: "Thursday Specials",
      category: "weekly",
      day: "Thursday",
    },
    {
      src: "/images/friday brooklin.jpg",
      title: "Friday Specials",
      category: "weekly",
      day: "Friday",
    },
    {
      src: "/images/sat-sun brooklin.jpg",
      title: "Weekend Specials",
      category: "weekly",
      day: "Saturday & Sunday",
    },
    {
      src: "/images/day time specials brooklin.jpg",
      title: "Day Time Specials",
      category: "time",
      day: "Day Time",
    },
    {
      src: "/images/late night specials brooklin.jpg",
      title: "Late Night Specials",
      category: "time",
      day: "Late Night",
    },
    {
      src: "/images/game time specials brooklin.jpg",
      title: "Game Time Specials",
      category: "event",
      day: "Game Days",
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
        return specialsImages; // "Primary" tab shows all specials
      case 1:
        return specialsImages.filter((img) => img.category === "daily");
      case 2:
        return specialsImages.filter((img) => img.category === "weekly");
      case 3:
        return specialsImages.filter((img) => img.category === "time");
      case 4:
        return specialsImages.filter((img) => img.category === "event");
      default:
        return specialsImages;
    }
  };

  const getDayColor = (day: string) => {
    const colors = {
      Monday: "#FF6B6B",
      Tuesday: "#4ECDC4",
      Wednesday: "#45B7D1",
      Thursday: "#FFA07A",
      Friday: "#98D8C8",
      "Saturday & Sunday": "#F7DC6F",
      Everyday: "#BB8FCE",
      "Day Time": "#85C1E9",
      "Late Night": "#5D6D7E",
      "Game Days": "#F8C471",
    };
    return colors[day as keyof typeof colors] || theme.palette.primary.main;
  };

  const categories = ["daily", "weekly", "time", "event"];

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
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <LocalOffer sx={{ fontSize: 64, mb: 2, color: "white" }} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", xl: "4.2rem" },
                  fontWeight: "bold",
                  mb: { xs: 3, xl: 4 },
                  lineHeight: { xs: 1.2, xl: 1.1 },
                }}
              >
                Daily Specials
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  opacity: 0.9,
                  maxWidth: 600,
                  mx: "auto",
                  fontSize: { xs: "1.2rem", md: "1.5rem", xl: "1.7rem" },
                  lineHeight: { xs: 1.4, xl: 1.3 },
                }}
              >
                Amazing deals every day of the week!
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Specials Categories */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 6, xl: 8 },
          px: { xs: 2, md: 4, xl: 6 },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
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
              "& .MuiTabs-flexContainer": {
                justifyContent: { xs: "flex-start", md: "center" },
              },
            }}
          >
            <Tab label="Primary" />
            <Tab label="All Day" />
            <Tab label="Weekly" />
            <Tab label="By Time" />
            <Tab label="Special Events" />
          </Tabs>
        </Box>

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
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    Specials
                  </Typography>
                  <Grid container spacing={{ xs: 4, xl: 6 }}>
                    {specialsImages
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
                                    const link = document.createElement("a");
                                    link.href = image.src;
                                    link.download = `${image.title}.jpg`;
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
                                    handleImageClick(image.src);
                                  }}
                                >
                                  <Fullscreen />
                                </IconButton>
                              </Box>
                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 1,
                                  }}
                                >
                                  <Typography variant="h6">
                                    {image.title}
                                  </Typography>
                                  <Chip
                                    label={image.day}
                                    sx={{
                                      backgroundColor: getDayColor(image.day),
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {image.title}
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
                All Day Everyday Specials
              </Typography>
              <Grid container spacing={{ xs: 4, xl: 6 }}>
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={image.src}>
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6">{image.title}</Typography>
                            <Chip
                              label={image.day}
                              sx={{
                                backgroundColor: getDayColor(image.day),
                                color: "white",
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Weekly deals you don't want to miss!
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
                Weekly Specials
              </Typography>
              <Grid container spacing={4}>
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={image.src}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          height: "100%",
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Schedule
                              sx={{
                                fontSize: 20,
                                color: theme.palette.primary.main,
                              }}
                            />
                            <Chip
                              label={image.day}
                              size="small"
                              sx={{
                                backgroundColor: getDayColor(image.day),
                                color: "white",
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {image.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Perfect timing for great savings!
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
                Time-Based Specials
              </Typography>
              <Grid container spacing={4}>
                {getFilteredImages().map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={image.src}>
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6">{image.title}</Typography>
                            <Chip
                              label={image.day}
                              sx={{
                                backgroundColor: getDayColor(image.day),
                                color: "white",
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Perfect for {image.day.toLowerCase()} dining
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 4, color: theme.palette.primary.main }}
              >
                Special Event Deals
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
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            image={image.src}
                            alt={image.title}
                            sx={{ height: 400, objectFit: "contain" }}
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
                                const link = document.createElement("a");
                                link.href = image.src;
                                link.download = `${image.title}.jpg`;
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
                                handleImageClick(image.src);
                              }}
                            >
                              <Fullscreen />
                            </IconButton>
                          </Box>
                        </Box>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6">{image.title}</Typography>
                            <Chip
                              label={image.day}
                              sx={{
                                backgroundColor: getDayColor(image.day),
                                color: "white",
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Join us for exciting game day specials and
                            promotions!
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
              alt="Special"
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

export default Specials;
