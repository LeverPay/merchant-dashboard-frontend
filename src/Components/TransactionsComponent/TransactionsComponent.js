import React, { useEffect, useRef, useState } from "react";
import {
  allTransactions,
  canceledTransactions,
  failedTransactions,
  paidTransactions,
  pendingTransactions,
  refundTransactions,
} from "../../TestData/TransactionsData";
import SearchBar from "../SearchBar/SearchBar";
import TransactionTable from "../TransactionTable/TransactionTable";
import "./transactionsComponent.css";
import Form from "../contact-support/form";
import { AiFillEye } from "react-icons/ai";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";
import {
  baseUrl,
  fund_transfers,
  get_transactions,
} from "../Endpoints/Endpoints";
function TransactionsComponent() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [hidebalance, setHidebalance] = useState(false);
  const btn = useRef();
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  const [displayForm, setDisplayForm] = useState(false);
  const [animate, setAnimate] = useState(false)

  const showForm = () => {
    setDisplayForm(true);
  };

  const hideTransactBal = () => {
    setHidebalance(!hidebalance);
  };

  const [transactionsData, setTransactionsData] = useState([]);

  const getTransactions = async () => {
    try {
      setAnimate(true)
      const req = await axios.get(baseUrl + get_transactions, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(req.data);
      if (req.status === 200) {
        setTransactionsData(req.data.data);
        setAnimate(false)
      }
    } catch (err) {
      console.log(err);
      setAnimate(false)
    }
  };

  const transferFunds = async () => {
    try {
      const req = await axios.post(
        baseUrl + fund_transfers,
        {
          email: "cetis71517@fandsend.com",
          amount: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
          },
        }
      );
      console.log(req.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
    // transferFunds();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <span className="eye" onClick={hideTransactBal}>
          {hidebalance ? (
            <RiEyeCloseLine size="30px" />
          ) : (
            <AiFillEye size="30px" />
          )}
        </span>
        <div className="offset-md-9" style={{ marginTop: "-10px" }}>
          {" "}
          <SearchBar />
        </div>
        <span className="show-btn eye">
          <p onClick={showForm} className="fw-bold" title="need help ?">
            ?
          </p>
        </span>
      </div>
      <div className="col-md-12 transactions-tab">
        <div className="panels">
          <div className={`panel ${checkActive(1, "active2")}`}>
            <TransactionTable
              data={transactionsData}
              hidebalance={hidebalance}
              animate={animate}
            />
          </div>
        </div>
      </div>
      {displayForm && <Form setDisplayForm={setDisplayForm} />}
    </>
  );
}

export default TransactionsComponent;
