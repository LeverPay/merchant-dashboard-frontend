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
function TransactionsComponent() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [hidebalance, setHidebalance] = useState(false);
  const btn = useRef();
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  const [displayForm, setDisplayForm] = useState(false);

  const showForm = () => {
    setDisplayForm(true);
    // setTransactionId(item.name);
  };

  const hideTransactBal = () => {
    setHidebalance(!hidebalance);
  };

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
        <span className="show-btn eye">
          <p onClick={showForm} className="fw-bold">
            ?
          </p>
        </span>
      </div>
      <div className="col-md-12 transactions-tab">
        <div className="tabs">
          <button
            className={`tab ${checkActive(1, "active2")}`}
            onClick={() => handleClick(1)}
          >
            All
          </button>
          <button
            className={`tab ${checkActive(2, "active2")}`}
            onClick={() => handleClick(2)}
          >
            Paid(1)
          </button>
          <button
            className={`tab ${checkActive(3, "active2")}`}
            onClick={() => handleClick(3)}
          >
            Pending(1)
          </button>{" "}
          <button
            className={`tab ${checkActive(4, "active2")}`}
            onClick={() => handleClick(4)}
          >
            Refund(1)
          </button>{" "}
          <button
            className={`tab ${checkActive(5, "active2")}`}
            onClick={() => handleClick(5)}
          >
            Failed(0)
          </button>{" "}
          <button
            className={`tab ${checkActive(6, "active2")}`}
            onClick={() => handleClick(6)}
          >
            Canceled(1)
          </button>{" "}
          <SearchBar />
        </div>{" "}
        <div className="panels">
          <div className={`panel ${checkActive(1, "active2")}`}>
            <TransactionTable
              data={allTransactions}
              hidebalance={hidebalance}
            />
          </div>
          <div className={`panel ${checkActive(2, "active2")}`}>
            {" "}
            <TransactionTable
              data={paidTransactions}
              hidebalance={hidebalance}
            />
          </div>
          <div className={`panel ${checkActive(3, "active2")}`}>
            {" "}
            <TransactionTable
              data={pendingTransactions}
              hidebalance={hidebalance}
            />
          </div>
          <div className={`panel ${checkActive(4, "active2")}`}>
            {" "}
            <TransactionTable
              data={refundTransactions}
              hidebalance={hidebalance}
            />
          </div>
          <div className={`panel ${checkActive(5, "active2")}`}>
            {" "}
            <TransactionTable
              data={failedTransactions}
              hidebalance={hidebalance}
            />
          </div>
          <div className={`panel ${checkActive(6, "active2")}`}>
            {" "}
            <TransactionTable
              data={canceledTransactions}
              hidebalance={hidebalance}
            />
          </div>
        </div>
      </div>
      {displayForm && <Form setDisplayForm={setDisplayForm} />}
    </>
  );
}

export default TransactionsComponent;
