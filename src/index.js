import React from "react";
import ReactDOM from "react-dom/client";
import "./Components/General/general.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationContext } from "./Components/General/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotificationContext>
      <App />
    </NotificationContext>
  </BrowserRouter>
);
