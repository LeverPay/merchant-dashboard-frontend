import React, { useState, useRef, useEffect } from "react";
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
import Icon from "../../Assets/pesin-Icon.png";
import UserSelectComponent from "../../Components/UserSelectComponent/UserSelectComponent";
import TransactionsComponent from "../../Components/TransactionsComponent/TransactionsComponent.js";
import RemitanceChart from "./RemitanceChart";
import CountUp from "react-countup";

import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpense/NewExpense";
import ExpensesChart from "./Expenses/ExpensesChart";
import Transactions from "./Expenses/Transactions";
import TransactionTable from "../../Components/TransactionTable/TransactionTable";
import axios from "axios";
import {
  baseUrl,
  get_dashboard_data,
} from "../../Components/Endpoints/Endpoints";
import TokenContext from "../../Components/User-Token/TokenContext";
import { useContext } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "car insurance",
    amount: "40053",
    date: new Date(2023, 6, 28),
  },
  {
    id: "e2",
    title: "toilet paper",
    amount: "20053",
    date: new Date(2023, 5, 28),
  },
  {
    id: "e3",
    title: "Shopping",
    amount: "70053",
    date: new Date(2023, 4, 28),
  },

  {
    id: "e4",
    title: "picnic",
    amount: "50053",
    date: new Date(2023, 3, 28),
  },
  {
    id: "e5",
    title: "charity",
    amount: "1253",
    date: new Date(2023, 2, 28),
  },
  {
    id: "e6",
    title: "vacation",
    amount: "20053",
    date: new Date(2023, 0, 28),
  },
  {
    id: "e7",
    title: "vacation",
    amount: "20053",
    date: new Date(2022, 0, 28),
  },
  {
    id: "e8",
    title: "vacation",
    amount: "46553",
    date: new Date(2022, 1, 28),
  },
  {
    id: "e10",
    title: "vacation",
    amount: "89553",
    date: new Date(2022, 2, 28),
  },
  {
    id: "e11",
    title: "vacation",
    amount: "19553",
    date: new Date(2022, 3, 28),
  },
  {
    id: "e12",
    title: "vacation",
    amount: "2553",
    date: new Date(2022, 4, 28),
  },
  {
    id: "e13",
    title: "vacation",
    amount: "89553",
    date: new Date(2022, 5, 28),
  },
  {
    id: "e14",
    title: "vacation",
    amount: "89553",
    date: new Date(2022, 6, 28),
  },
  {
    id: "e15",
    title: "vacation",
    amount: "9553",
    date: new Date(2022, 7, 28),
  },
  {
    id: "e16",
    title: "vacation",
    amount: "109553",
    date: new Date(2022, 8, 28),
  },
  {
    id: "e17",
    title: "vacation",
    amount: "3553",
    date: new Date(2022, 9, 28),
  },
  {
    id: "e18",
    title: "vacation",
    amount: "23553",
    date: new Date(2022, 10, 28),
  },
  {
    id: "e19",
    title: "vacation",
    amount: "133553",
    date: new Date(2022, 11, 28),
  },
];

const DUMMY_EXPENSES2 = [
  {
    id: "e1",
    title: "car insurance",
    amount: "40053",
    date: new Date(2023, 0, 28),
  },
  {
    id: "e2",
    title: "car insurance",
    amount: "140053",
    date: new Date(2023, 1, 28),
  },
  {
    id: "e3",
    title: "car insurance",
    amount: "140053",
    date: new Date(2023, 2, 28),
  },
  {
    id: "e4",
    title: "car insurance",
    amount: "33053",
    date: new Date(2023, 3, 28),
  },
  {
    id: "e5",
    title: "car insurance",
    amount: "98053",
    date: new Date(2023, 4, 28),
  },
];
export const OverviewPage = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  useEffect(() => {
    setTimeout(() => {
      // update with endpoint data
      setExpenses([]);
    }, 2000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      // update with endpoint data
      setTransactions([]);
    }, 2000);
  }, []);

  const [data, setData] = useState([]);
  const { notify } = useContext(TokenContext);

  const getDashboardData = async () => {
    try {
      const req = await axios.get(baseUrl + get_dashboard_data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(req.data.data);
      if (req.status === 200) {
        setData(req.data.data);
      }
    } catch (err) {
      notify("Something went wrong while gettng your data");
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="flexy flexyM">
          <div style={{ flexGrow: 1 }}>
            <h6>Hi! {data?.first_name}</h6>
            <h2>Welcome!</h2>
          </div>
          <form className="col-md-2">
            <input type="search" className="form-control" />
          </form>
        </div>
        <div className="activity-summary row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
          <div className="col ">
            <div className="summary-item flexy flexyM glass-bg">
              <div className="col-md-7">
                {" "}
                <h5>Mtly trans</h5>
                <h3>
                  {" "}
                  <CountUp
                    // update with endpoint data
                    start={0}
                    // update with endpoint data
                    end={0}
                    duration={4}
                    decimal=""
                    prefix=""
                    // +Billions(whatever)
                    suffix=""
                    enableScrollSpy={true}
                  />
                </h3>
              </div>
              <div className="col-md-5">
                <Transactions items={transactions} />
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary-item flexy flexyM glass-bg">
              <div className="col-md-3  icon-bg col-3">
                {" "}
                <center>
                  <img src={Icon} alt="smiley" className="" />
                </center>
              </div>
              <div className="col-md-7 offset-md-3">
                {" "}
                <h5>Wkly trans</h5>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={0}
                    duration={4}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                  />
                </h3>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary-item flexy flexyM glass-bg">
              <div className="col-md-3 icon-bg col-3">
                {" "}
                <center>
                  <img src={Icon} alt="smiley" className="" />
                </center>
              </div>
              <div className="col-md-7 offset-md-3">
                {" "}
                <h5>Daily trans</h5>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={0}
                    duration={4}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                  />
                </h3>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary-item flexy flexyM activity-item glass-bg2">
              <div className="col-md-7">
                {" "}
                <h5>Wallet Balance</h5>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={data?.wallet?.amount?.ngn}
                    duration={4}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                  />
                </h3>
              </div>
              <div className="col-md-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="92"
                  height="44"
                  viewBox="0 0 92 44"
                  fill="none"
                >
                  <path
                    d="M2.5 41.5C2.5 41.5 8.77975 -6.00537 24.5 16C40.2203 38.0054 46.5 36.9946 52.5 20C59.9168 -1.0075 87.258 17.0806 90 2"
                    stroke="url(#paint0_linear_5710_195)"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5710_195"
                      x1="-1.00002"
                      y1="46.5"
                      x2="71.0778"
                      y2="-16.9144"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flexy">
          <div className=" col-md-4">
            <div className="empty-div col-md-11  mdiv1 glass-bg">
              <center>
                {" "}
                <h3>Customers</h3>
              </center>
              <div className="flexy flexyM">
                <div className="col-md-6 report-div">
                  <p>Total users</p>
                  <h4>0</h4>
                </div>
                <div className="col-md-6 report-div">
                  <p>Total returned users</p>
                  <h4>0</h4>
                </div>
              </div>
              <hr />
              <div className="flexy flexyM">
                <div style={{ flexGrow: "1" }}>
                  <h5 style={{ color: " #1B2559" }}>Performance</h5>
                  <small style={{ color: "#05CD99" }}>0%</small>
                </div>
                <button className="col-md-4">Download</button>
              </div>
            </div>
          </div>
          <div className="empty-div col-md-8 remitance-div glass-bg">
            <h3>Total Revenue</h3>
            <div className="activity-summary row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
              <div className="col">
                <div className="summary-item bordered-summary">
                  <h5>Generated</h5>
                  <div className="col-md-12   flexy flexyM">
                    {" "}
                    <h3 style={{ flexGrow: "1" }}>
                      {" "}
                      <CountUp
                        start={0}
                        end={0}
                        duration={4}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                      />
                    </h3>
                    <small style={{ color: "#05CD99" }}>0%</small>
                  </div>
                </div>
              </div>{" "}
              <div className="col">
                <div className="summary-item bordered-summary">
                  <h5>Remitted</h5>
                  <div className="col-md-12   flexy flexyM">
                    {" "}
                    <h3 style={{ flexGrow: "1" }}>
                      {" "}
                      <CountUp
                        start={0}
                        end={0}
                        duration={4}
                        decimal=""
                        prefix=" "
                        suffix="0"
                        enableScrollSpy={true}
                      />
                    </h3>
                    <small style={{ color: "#E31A1A" }}>0%</small>
                  </div>
                </div>
              </div>{" "}
              <div className="col">
                <div className="summary-item bordered-summary">
                  <h5>Unremitted</h5>
                  <div className="col-md-12   flexy flexyM">
                    {" "}
                    <h3 style={{ flexGrow: "1" }}>
                      {" "}
                      <CountUp
                        start={0}
                        end={0}
                        duration={4}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                      />
                    </h3>
                    {/* <small>+2.45%</small> */}
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* <Chart /> */}

            <RemitanceChart />
          </div>
        </div>
        {/* <NewExpense onAddExpense={addExpenseHandler} /> */}
        <div className="col-md-12 flexy">
          <div className="col-md-4 ">
            {" "}
            <div className="col-md-11 glass-bg users-container">
              <h5>Mtly Successful Trans</h5>
              <Expenses items={expenses} />
            </div>
            <div className="transa-div col-md-11  glass-bg">
              <center>
                <h5>Total Transactions</h5>
              </center>
              <div className="flexy flexyM">
                <div className="col-md-6 report-div">
                  <h5>Successful </h5>

                  <h4>
                    {" "}
                    <CountUp
                      start={0}
                      end={0}
                      duration={4}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h4>
                </div>
                <div className="col-md-6 report-div">
                  <h5>Failed </h5>
                  <h4>
                    {" "}
                    <CountUp
                      start={0}
                      end={0}
                      duration={4}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 transact-container">
            <TransactionsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
