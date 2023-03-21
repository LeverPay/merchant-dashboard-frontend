import React from "react";
import OverView from "./Pages/overview";
import PaymentMethod from "./Pages/paymentMethod";
import Portfolio from "./Pages/portfolio";
import Profile from "./Pages/profile";
import Security from "./Pages/security";
import Transacrion from "./Pages/transaction";
import SidebarNav from "./Components/General/SidebarNav";
import Header from "./Components/General/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <SidebarNav />
      <Routes>
        <Route index element={<OverView />} />
        <Route path="payment-method" index element={<PaymentMethod />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="profile" element={<Profile />} />
        <Route path="security" index element={<Security />} />
        <Route path="transactions" element={<Transacrion />} />
      </Routes>
    </Router>
  );
}

export default App;
