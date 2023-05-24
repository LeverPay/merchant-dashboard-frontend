import React from "react";
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

function App(props) {
  // 'X-CSRF-TOKEN: lKQ8Pdl6IhJpV9HuIek6EfCi1nIq1dvrPhk4X2Ye'
  return (
    <div id="merchant-dashboard" className="general-container">
      <Router>
        <Header />
        <div className="contents-container">
          <Routes>
            <Route index element={<OverviewPage />} />
            <Route path="payment_method" index element={<PaymentMethod />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="security" index element={<Security />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="Help&support" element={<Help />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
