import React, { useRef, useState, useEffect } from "react";
import PaymentMethod from "./Pages/PaymentMethod";
import Profile from "./Pages/Profile";
import Security from "./Pages/Security";
import SidebarNav from "./Components/General/SidebarNav";
import Header from "./Components/General/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./Pages/OverviewPage/OverviewPage";
import "./App.css";
import PortfolioPage from "./Pages/PortfolioPage/PortfolioPage";
import TransactionsPage from "./Pages/TransactionsPage/TransactionsPage";
import Help from "./Pages/Help & Support/help";
import SignInPage from "./Pages/SignInPage/SignInPage";
import View from "./Pages/View";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import { useLocation } from "react-router-dom";

function App(props) {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  let currentUrl;
  useEffect(() => {
    currentUrl = location.pathname;
    setTimeout(() => {
      switch (currentUrl) {
        case "/":
        case "/welcome":
          setShowNav(false);
          break;
        default:
          setShowNav(true);
          break;
      }
    });
  });
  let NavId;
  NavId = showNav ? "merchant-dashboard" : "";
  return (
    <div id={NavId} className="general-container">
      {showNav && <Header />}
      <div className="contents-container">
        <Routes>
          <Route index element={<SignInPage />} />
          <Route path="dashboard" element={<OverviewPage />} />
          <Route path="view" element={<View />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="Help" element={<Help />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="payment-method" element={<PaymentMethod />} />
          <Route path="welcome" element={<WelcomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
