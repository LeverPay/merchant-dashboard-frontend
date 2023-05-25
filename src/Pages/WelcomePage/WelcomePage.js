import React from "react";
import "./welcome-page.css";
import Coins from "../../Assets/coins.png";
import Phone from "../../Assets/cryptocurrency.png";
import Man from "../../Assets/man.png";
import Wallet from "../../Assets/Digital-wallet.png";

function WelcomePage() {
  return (
    <div className="col-md-10 offset-md-1 flexy welcome-page-container">
      <div className="col-md-6 welcome-paragraph">
        <h1>Welcome!</h1>
        <h2>Get started with Leverpay</h2>
        <p>
          Leverpay is the best and most reliable platform that makes it easy to
          receive and make payment with crypto anywhere in the world
        </p>
        <div className="col-md-12 flexy">
          <div className="col-md-4">
            {" "}
            <img src={Coins} alt="smiley" className="col-md-12" />
          </div>
          <div className="col-md-4">
            {" "}
            <img src={Phone} alt="smiley" />
          </div>
          <div className="col-md-4">
            {" "}
            <img src={Man} alt="smiley" />
          </div>
        </div>{" "}
        <div className="col-md-12 offset-md-3 wallet-container ">
          <div className="col-md-6">
            {" "}
            <img src={Wallet} alt="smiley" className="col-md-12" />
          </div>
        </div>
      </div>
      <div className="col-md-6 welcome-account-type">
        <center>
          <h1>What Would you like to use Leverpay for?</h1>
        </center>
      </div>
    </div>
  );
}

export default WelcomePage;
