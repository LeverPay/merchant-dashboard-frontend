import React from "react";
import ReactDOM from "react-dom/client";
import "./Components/General/general.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationContext } from "./Components/General/NotificationContext";
import { TokenContext } from "./Components/User-Token/TokenContext";
import { ToastContainer, toast } from "react-toastify";
import { ImageContext } from "./Components/General/ImageContext";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TokenContext>
      <ImageContext>
        <NotificationContext>
          <ToastContainer
            position="top-center"
            autoClose={false}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
          />
          <App />
        </NotificationContext>
      </ImageContext>
    </TokenContext>
  </BrowserRouter>
);
