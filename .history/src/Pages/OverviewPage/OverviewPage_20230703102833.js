import React, { useState, useRef } from "react";
import Chart from "../../Components/Chart/Chart";
import "./overview-page.css";
import { chartData, doughnutChartData } from "../../TestData/ChartData";
import Bitcoin from "../../Assets/bitcoin.png";
import Etheruem from "../../Assets/ethereum.png";
import Binance from "../../Assets/binance.png";
import Coin from "../../Assets/coin-flip.png";
import USDT from "../../Assets/usdt2.png";
import USDC from "../../Assets/usdc2.png";
import BUSD from "../../Assets/busd2.png";
import FIAT from "../../Assets/fiat3.png";
import NAIRA from "../../Assets/naira2.png";
import UserSelectComponent from "../../Components/UserSelectComponent/UserSelectComponent";
import TransactionsComponent from "../../Components/TransactionsComponent/TransactionsComponent.js";

export const OverviewPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  return (
    <>
      <div className="col-md-12 chart-tab">
        <center className="">
          {" "}
          <button className="overview-btn">Sales Analysis</button>
          <button className="overview-btn">Transaction Analysis</button>
          <button className="overview-btn">Trending Coin</button>{" "}
        </center>{" "}
        <div className="panels">
          <div className={`panel ${checkActive(1, "active2")}`}>
            <div className="col-md-12  chart-section">
              <div className="col-md-4 ">
                <div className="col-md-11 chart-container">
                  {" "}
                  <Chart
                    type={"column"}
                    chartData={chartData}
                    bgColor="#125cf4"
                    color="#399cc6"
                    Legend={false}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-11  chart-container2">
                  {" "}
                  <Chart
                    type={"doughnut"}
                    chartData={doughnutChartData}
                    bgColor="white"
                    Legend={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-11 trending-coin">
                  <div className="coin-flip">
                    {" "}
                    <center>
                      {" "}
                      <img src={Coin} alt="smiley" className="col-md-9" />
                    </center>
                  </div>
                  <div className="flexy flexyM">
                    <ul className="list-unstyled first-coins">
                      <li>
                        <span>
                          {" "}
                          <img src={USDT} alt="smiley" className="col-md-9" />
                        </span>
                        USDT
                      </li>
                      <li>
                        <span>
                          {" "}
                          <img src={NAIRA} alt="smiley" className="col-md-9" />
                        </span>
                        NAIRA
                      </li>
                      <li>
                        <span>
                          {" "}
                          <img src={BUSD} alt="smiley" className="col-md-9" />
                        </span>
                        BUSD
                      </li>
                    </ul>{" "}
                    <ul className="list-unstyled">
                      <li>
                        <span>
                          {" "}
                          <img src={FIAT} alt="smiley" className="col-md-9" />
                        </span>
                        FIAT
                      </li>
                      <li>
                        <span>
                          {" "}
                          <img src={USDC} alt="smiley" className="col-md-9" />
                        </span>
                        USDC
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`panel ${checkActive(2, "active2")}`}>2</div>
          <div className={`panel ${checkActive(3, "active2")}`}>3</div>
        </div>
      </div>
      <div className="col-md-12 table-header">
        <h5>Transaction History</h5>
        <div className="col-md-2 select-container">
          {" "}
          <UserSelectComponent />
        </div>
      </div>
      <div className="col-md-12">
        <TransactionsComponent />
      </div>
    </>
  );
};

export default OverviewPage;
