import React from "react";
import ReactDOM from "react-dom/client";
import "./Components/General/general.css";
// import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInPage from "./Pages/SignInPage/SignInPage";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
