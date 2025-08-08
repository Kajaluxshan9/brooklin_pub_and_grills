import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface Brand {
  name: string;
  logo: string;
  alt: string;
}

const brands: Brand[] = [
  { name: "3 Speed", logo: "/brands/3speed.webp", alt: "3 Speed Lager" },
  {
    name: "Alexander Keith's",
    logo: "/brands/alexkeith.webp",
    alt: "Alexander Keith's India Pale Ale",
  },
  { name: "Bud Light", logo: "/brands/budl.webp", alt: "Bud Light" },
  { name: "Budweiser", logo: "/brands/budwei.webp", alt: "Budweiser" },
  {
    name: "Goose Island",
    logo: "/brands/goose.webp",
    alt: "Goose Island Beer Co.",
  },
  { name: "Guinness", logo: "/brands/guineess.webp", alt: "Guinness" },
  { name: "Harp", logo: "/brands/harpp.webp", alt: "Harp Lager" },
  { name: "Landshark", logo: "/brands/landshark.webp", alt: "Landshark" },
  {
    name: "Michelob Ultra",
    logo: "/brands/mitchelob.webp",
    alt: "Michelob Ultra",
  },
  {
    name: "Peroni",
    logo: "/brands/perioni.webp",
    alt: "Peroni Nastro Azzurro",
  },
  { name: "Somersby", logo: "/brands/somerbby.webp", alt: "Somersby" },
  { name: "Stella Artois", logo: "/brands/stella.webp", alt: "Stella Artois" },
];

const BrandCarousel: React.FC = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const brandsPerView = isSmallScreen
    ? 3
    : isMediumScreen
    ? 4
    : isLargeScreen
    ? 5
    : 6;

  const totalBrands = brands.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBrands);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalBrands]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalBrands;
      // Reset to beginning when we reach the end to maintain infinite loop
      if (newIndex === 0 && prevIndex === totalBrands - 1) {
        setTimeout(() => {
          setCurrentIndex(0);
        }, 600); // Match transition duration
      }
      return newIndex;
    });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalBrands) % totalBrands);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };


  return (
    <Box sx={{ position: "relative", width: "100%", py: 2 }}>
      {/* Main carousel container */}
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: { xs: 1, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: `${(totalBrands * 100) / brandsPerView}%`,
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(-${(currentIndex * 100) / totalBrands}%)`,
          }}
        >
          {brands
            .concat(brands.slice(0, brandsPerView - 1))
            .map((brand, index) => (
              <Box
                key={`${brand.name}-${index}`}
                sx={{
                  flex: `0 0 ${100 / totalBrands}%`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: { xs: 100, md: 160 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 0,
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      transform: "scale(1.05)",
                    },
                    width: "94%",
                  }}
                >
                  <OptimizedImage
                    src={brand.logo}
                    alt={brand.alt}
                    loading="lazy"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: { xs: 100, md: 140 },
                      width: "auto",
                      height: "auto",
                      filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            ))}
        </Box>

        {/* Navigation arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: { xs: 4, md: 8 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            width: { xs: 16, md: 30 },
            height: { xs: 16, md: 30 },
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.2s ease",
            zIndex: 2,
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: { xs: 4, md: 8 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            width: { xs: 16, md: 30 },
            height: { xs: 16, md: 30 },
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.2s ease",
            zIndex: 2,
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Pagination dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        {brands.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                index === currentIndex
                  ? theme.palette.primary.main
                  : theme.palette.action.disabled,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  index === currentIndex
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                transform: "scale(1.3)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BrandCarousel;
