import React from "react";
import "./welcome-page.css";
import Coins from "../../Assets/coins2.png";
import Phone from "../../Assets/cryptocurrency.png";
import Man from "../../Assets/man.png";
import Wallet from "../../Assets/Digital-wallet.png";
import Icon1 from "../../Assets/group-account.png";
import { Link } from "react-router-dom";

import Icon from "../../Assets/group-account.png";
import Icon2 from "../../Assets/personal-account.png";
import CreateAccount from "../CreateAccount/CreateAccount";
function WelcomePage() {
  return (
    <div className="col-md-10 offset-md-1 flexy welcome-page-container">
      <div className="col-md-6 welcome-paragraph">
        {/* <h1 className="word">Welcome!</h1> */}
        <h1 className="welcome-heading">
          <span className="word">
            WELCOME<span className="superscript">!</span>{" "}
          </span>
          {/* <span class="word">Creek</span> */}
        </h1>
        <h2>Get started with Leverpay</h2>
        <p>
          Leverpay is the best and most reliable platform that makes it easy to
          receive and make payment with crypto anywhere in the world
        </p>
        <div className="col-md-12 flexy wel-page-imgs ">
          <div className="col-md-4 col-12">
            {" "}
            <img src={Coins} alt="smiley" className=" coin-globe" />
          </div>
          <div className="col-md-4 col-12">
            {" "}
            <img src={Phone} alt="smiley" />
          </div>
          <div className="col-md-4 col-12">
            {" "}
            <img src={Man} alt="smiley" />
          </div>
        </div>{" "}
        <div className="col-md-12 offset-md-3 wallet-container ">
          <div className="col-md-6 col-12">
            {" "}
            <img src={Wallet} alt="smiley" className="col-md-12" />
          </div>
        </div>
      </div>
      <div className="col-md-6 welcome-account-type">
        <center>
          <h1>What Would you like to use Leverpay for?</h1>
        </center>
        <CreateAccount
          id="demoID"
          accType="Business"
          icon={Icon}
          bg2="#Fdecc4"
        />

        <CreateAccount
          id="demoID2"
          accType="Personal"
          bg="#F49B09EB"
          bg2="transparent"
          icon={Icon2}
        />

        {/* <BusinessAccount /> */}
      </div>
    </div>
  );
}

export default WelcomePage;
