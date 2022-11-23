import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/home/AboutPage";
import HomePage from "../../features/home/HomePage";
import Product from "../../features/product/Product";
import ProductDetails from "../../features/product/ProductDetails";
import Header from "./Header";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  const [mode, setMode] = useState(false);
  const modeDisplay = mode ? "dark" : "light";

  const handleMode = () => setMode(!mode);

  const theme = createTheme({
    palette: {
      mode: modeDisplay,
      background: {
        default: modeDisplay === "light" ? "#f0f5f7" : "#384348",
      },
    },
  });


  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleMode={handleMode} />
      <Container sx={{mt:2}}>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>

      </Container>
    </ThemeProvider>
  </>

  );
}

