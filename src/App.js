import React, { useRef, useState, useEffect } from "react";
import PaymentMethod from "./Pages/PaymentMethod";
import Profile from "./Pages/Profile";
import Security from "./Pages/Security";
import SidebarNav from "./Components/General/SidebarNav";
import Header from "./Components/General/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./Pages/OverviewPage/OverviewPage";
import "./App.css";
// import PortfolioPage from "./Pages/PortfolioPage/PortfolioPage";
import TransactionsPage from "./Pages/TransactionsPage/TransactionsPage";
import Help from "./Pages/Help & Support/help";
import SignInPage from "./Pages/SignInPage/SignInPage";
import View from "./Pages/View";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import { useLocation } from "react-router-dom";
import ForgetPassword from "./Pages/SignInPage/ForgotPassword/ForgetPassword";
import Generate_Invoice_Page from "./Pages/Generate Invoice/Generate_Invoice_Page";
import Subscription from "./Pages/SubscriptionPage/Subscription";
import History from "./Components/new Invoice/History";

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
        case "/forget-password":
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
          {/* <Route path="portfolio" element={<PortfolioPage />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="Help" element={<Help />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="remitance-setup" element={<PaymentMethod />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="new" element={<Generate_Invoice_Page />} />
          <Route path="history" element={<History />} />
          <Route path="subscriptions" element={<Subscription />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
