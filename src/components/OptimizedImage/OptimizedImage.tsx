import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface OptimizedImageProps extends Omit<BoxProps, "component"> {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
  aspectRatio?: string;
  fallbackColor?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  loading = "lazy",
  aspectRatio,
  fallbackColor = "#f5f5f5",
  sx = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: aspectRatio,
        ...sx,
      }}
      {...props}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: fallbackColor,
          }}
        />
      )}

      {!hasError && (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}

      {hasError && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            bgcolor: fallbackColor,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          Failed to load image
        </Box>
      )}
    </Box>
  );
};

export default OptimizedImage;
