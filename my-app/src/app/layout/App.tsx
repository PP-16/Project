import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/home/AboutPage";
import HomePage from "../../features/home/HomePage";
import Product from "../../features/product/Product";
import ProductDetails from "../../features/product/ProductDetails";
import Header from "./Header";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from "../redux/configureStore";
import agent from "../api/agent";
import { ToastContainer } from "react-toastify";
import { setBasket } from "../../features/basket/basketSlice";
import { getCookie } from "../util/util";
import BasketPage from "../../features/basket/BasketPage";
import ServerError from "./ServerError";
import NotFound from "./NotFound";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);

//#region mode
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
//#endregion

  return (
    <>
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>

      <CssBaseline />
      <Header handleMode={handleMode} />
      <Container sx={{mt:2}}>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/server-error" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />

          </Routes>

      </Container>
    </ThemeProvider>
  </>

  );
}

