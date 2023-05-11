import React, { useState } from "react";
import "./portfolio-page.css";
import Add from "../../Assets/add-icon.png";
import Bitcoin from "../../Assets/bitcoin.png";
import Etheruem from "../../Assets/ethereum.png";
import Binance from "../../Assets/binance.png";
import Silver from "../../Assets/silver-coin.png";
import Converter from "../../Assets/crypto-converter.png";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { Portfolios } from "./Portfolios/Portfolios";
import { AiFillEye } from "react-icons/ai";
import { RiEyeCloseLine } from "react-icons/ri";

function PortfolioPage() {
  const [displayBalance, setDisplayBalance] = useState(false);

  const __bitcoin_Balance = `$15,00000USD`;
  const __Etherum_Balance = `$5,00000USD`;
  const __Binance_Balance = `$12,00000USD`;
  const bitNum = `2.00001234BTC`;
  const ethNum = `2.00001234ETH`;
  const binNum = `2.0012334BnR`;

  const hideBalance = () => {
    setDisplayBalance(!displayBalance);
  };

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
      <span className="eye" onClick={hideBalance}>
        {!displayBalance ? <AiFillEye size="25px" /> : <RiEyeCloseLine size="25px" />}
      </span>
      <div className="col-md-12 flexy">
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="#eea11a"
              coin={Bitcoin}
              coinNum={displayBalance ? bitNum : `xxxx23xxxx12`}
              coinAmount={displayBalance ? __bitcoin_Balance : `0xxx34xxxx2xx`}
              coinName="Bitcoin"
            />
          </div>
        </div>{" "}
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="#fff"
              coin={Etheruem}
              coinNum={displayBalance ? ethNum : `xxxx18xxxx12`}
              coinAmount={displayBalance ? __Etherum_Balance : `0xxx77xxxx2xx`}
              coinName="Ethereum"
            />
          </div>
        </div>{" "}
        <div className="col-md-4">
          <div className="col-md-11">
            <Portfolios
              bg="rgb(13,12,48)"
              coin={Binance}
              coinNum={displayBalance ? binNum : `xxxx13xxxx12`}
              coinAmount={displayBalance ? __Binance_Balance : `0xxx54xxxx8xx`}
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
