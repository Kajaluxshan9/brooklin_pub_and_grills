import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  // Create light theme only
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6B4423", // Brown color
        light: "#8B5A2B",
        dark: "#4A2C17",
      },
      secondary: {
        main: "#D4AF37", // Gold color
        light: "#FFD700",
        dark: "#B8860B",
      },
      background: {
        default: "#FAFAFA",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#2c2c2c",
        secondary: "#555555",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "2rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
