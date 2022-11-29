import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/home/AboutPage";
import HomePage from "../../features/home/HomePage";
import Product from "../../features/product/Product";
import ProductDetails from "../../features/product/ProductDetails";
import Header from "./Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import agent from "../api/agent";
import { ToastContainer } from "react-toastify";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import { getCookie } from "../util/util";
import BasketPage from "../../features/basket/BasketPage";
import ServerError from "./ServerError";
import NotFound from "./NotFound";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Register from "../../features/account/Register";
import { PrivateLogin, PrivateRoute } from "./PrivateRoute";
import CheckoutPage from "../../features/order/CheckoutPage";
import OrderPage from "../../features/order/OrderPage";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { fullscreen } = useAppSelector((state) => state.screen);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  //#region mode
  const [mode, setMode] = useState(false);
  const displayMode = mode ? "light" : "dark";

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  const handleMode = () => setMode(!mode);
  //#endregion

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <Header handleMode={handleMode} />
        {fullscreen ? (
          <>{mainroute}</>
        ) : (
          <Box sx={{ mt: 2 ,ml:10,mr:10,mb:2}}>{mainroute}</Box>
        )}
      </ThemeProvider>
    </>
  );
}

const mainroute = (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/About" element={<AboutPage />} />
    <Route path="/product" element={<Product />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/basket" element={<BasketPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/server-error" element={<ServerError />} />
    <Route
      path="/login"
      element={
        <PrivateLogin>
          <Login />
        </PrivateLogin>
      }
    />
    <Route element={<PrivateRoute />}>
      <Route path="/checkout" element={<CheckoutPage />} />\
      <Route path="/orders" element={<OrderPage/>}/>
    </Route>

    {/* <Route element={<PrivateRoute roles={["Admin"]}/>}>
    <Route path="/inventory" element={<Inventory />} />
  </Route> } */}
  </Routes>
);
