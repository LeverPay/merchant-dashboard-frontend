import React from "react";
import "./portfolio-page.css";
import Add from "../../Assets/add-icon.png";
import Bitcoin from "../../Assets/bitcoin.png";
import Etheruem from "../../Assets/ethereum.png";
import Binance from "../../Assets/binance.png";
import Silver from "../../Assets/silver-coin.png";
import Converter from "../../Assets/crypto-converter.png";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { Portfolios } from "./Portfolios/Portfolios";

function PortfolioPage() {
  return (
    <>
      <div className="col-md-12 portfolio-top">
        <div className="add-coin-button">
          {" "}
          <button className="">
            {" "}
            <img src={Add} alt="smiley" className="col-md-" /> Add Coin
          </button>
        </div>

        <SearchBar />
      </div>
      <div className="col-md-12 converter-container">
        <img src={Converter} alt="smiley" className="col-md-" />
        <h3>CREDIT</h3>
      </div>
      <div className="col-md-12 flexy">
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="#eea11a"
              coin={Bitcoin}
              coinNum="2.00001234BTC"
              coinAmount="$15,00000USD"
              coinName="Bitcoin"
            />
          </div>
        </div>{" "}
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="#fff"
              coin={Etheruem}
              coinNum="2.00001234ETH"
              coinAmount="$5,00000USD"
              coinName="Ethereum"
            />
          </div>
        </div>{" "}
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="rgb(13,12,48)"
              coin={Binance}
              coinNum="2.0012334BnR"
              coinAmount="$12,00000USD"
              coinName="Binance"
              color="#fff"
            />
          </div>
        </div>
      </div>
      <center className="coins">
        <img src={Bitcoin} alt="smiley" className="col-md-" />
        <img src={Etheruem} alt="smiley" className="col-md-" />
        <img src={Binance} alt="smiley" className="col-md-" />
        <img src={Silver} alt="smiley" className="col-md-" />
      </center>
    </>
  );
}

export default PortfolioPage;
