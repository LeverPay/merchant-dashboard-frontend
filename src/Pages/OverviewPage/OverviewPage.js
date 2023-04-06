import React, { useState } from "react";
import Chart from "../../Components/Chart/Chart";
import "./overview-page.css";
import { chartData, doughnutChartData } from "../../TestData/ChartData";
import Bitcoin from "../../Assets/bitcoin.png";
import Etheruem from "../../Assets/ethereum.png";
import Binance from "../../Assets/binance.png";
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
        <div className="tabs">
          <button
            className={`tab ${checkActive(1, "active2")}`}
            onClick={() => handleClick(1)}
          >
            Sales Analysis
          </button>
          <button
            className={`tab ${checkActive(2, "active2")}`}
            onClick={() => handleClick(2)}
          >
            Transaction Analysis
          </button>
          <button
            className={`tab ${checkActive(3, "active2")}`}
            onClick={() => handleClick(3)}
          >
            Trending Coin
          </button>{" "}
        </div>{" "}
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
                  <span className="empty"></span>
                  <ul className="list-unstyled">
                    <li>
                      <span>
                        {" "}
                        <img src={Bitcoin} alt="smiley" className="col-md-9" />
                      </span>
                      Bitcoin
                    </li>
                    <li>
                      <span>
                        {" "}
                        <img src={Etheruem} alt="smiley" className="col-md-9" />
                      </span>
                      Etheruem
                    </li>
                    <li>
                      <span>
                        {" "}
                        <img src={Binance} alt="smiley" className="col-md-9" />
                      </span>
                      Binance
                    </li>
                  </ul>
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
