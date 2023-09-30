import React from "react";
// import SidebarNav from "./Components/General/?SidebarNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./OverviewPage/OverviewPage";
import PaymentMethod from "./PaymentMethod";
import PortfolioPage from "./PortfolioPage/PortfolioPage";
import Profile from "./Profile";
import Security from "./Security";
import TransactionsPage from "./TransactionsPage/TransactionsPage";
import Help from "./Help & Support/help";
import SignInPage from "./SignInPage/SignInPage";
import Header from "../Components/General/Header";
import App from "../App";
import WelcomePage from "./WelcomePage/WelcomePage";

function View(props) {
  return (
    <></>
    // <div id="merchant-dashboard" className="general-container">
    //   <Header />
    //   <div className="contents-container">
    //     {/* <Routes>
    //       <Route index element={<OverviewPage />} />
    //       <Route path="payment_method" index element={<PaymentMethod />} />
    //       <Route path="portfolio" element={<PortfolioPage />} />
    //       <Route path="profile" element={<Profile />} />
    //       <Route path="security" index element={<Security />} />
    //       <Route path="view/transactions" element={<TransactionsPage />} />
    //       <Route path="Help&support" element={<Help />} />
    //       <Route path="sign-in" element={<SignInPage />} />
    //       <Route path="app" element={<App />} />
    //       <Route path="welcome" element={<WelcomePage />} />
    //     </Routes> */}
    //   </div>
    // </div>
  );
}

export default View;
