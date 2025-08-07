import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Menu from "../../pages/Menu/Menu";
import Specials from "../../pages/Specials/Specials";
import Contact from "../../pages/Contact/Contact";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

export default Layout;
