import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./app/contact/StoreContext";
import App from "./app/layout/App";
import { store } from "./app/redux/configureStore";
import { fetchProductsAsync } from "./features/product/productSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

console.log(store.getState())
store.dispatch(fetchProductsAsync())

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
