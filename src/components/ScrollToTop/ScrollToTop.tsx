import React, { useState, useEffect } from 'react';
import { Fab, useTheme, useMediaQuery } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  // Show/hide button on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change - instant scroll for route changes
  useEffect(() => {
    const scrollToTopInstantly = () => {
      // Multiple methods to ensure cross-browser compatibility
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // Ensure instant scroll behavior for all browsers
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
    };

    // Immediate scroll
    scrollToTopInstantly();

    // Use requestAnimationFrame to ensure scroll happens after DOM updates
    requestAnimationFrame(() => {
      scrollToTopInstantly();
    });

    // Additional fallback with a small delay for dynamic content loading
    const timeoutId = setTimeout(scrollToTopInstantly, 10);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: isMobile ? 20 : 30,
            right: isMobile ? 20 : 30,
            zIndex: 1000,
          }}
        >
          <Fab
            size={isMobile ? "medium" : "large"}
            color="primary"
            onClick={scrollToTop}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
