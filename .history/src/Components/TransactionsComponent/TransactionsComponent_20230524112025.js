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
function TransactionsComponent() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const btn = useRef();
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  // useEffect(() => {
  //   const open = () => setGenerateInvoice(!generateInvoice);
  //   const close = () => setGenerateInvoice(false);
  //   btn.current.addEventListener("click", open);

  //   // return () => btn.current.removeEventListener("click", open);
  // }, [generateInvoice]);
  return (
    <>
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
            <TransactionTable data={allTransactions} />
          </div>
          <div className={`panel ${checkActive(2, "active2")}`}>
            {" "}
            <TransactionTable data={paidTransactions} />
          </div>
          <div className={`panel ${checkActive(3, "active2")}`}>
            {" "}
            <TransactionTable data={pendingTransactions} />
          </div>
          <div className={`panel ${checkActive(4, "active2")}`}>
            {" "}
            <TransactionTable data={refundTransactions} />
          </div>
          <div className={`panel ${checkActive(5, "active2")}`}>
            {" "}
            <TransactionTable data={failedTransactions} />
          </div>
          <div className={`panel ${checkActive(6, "active2")}`}>
            {" "}
            <TransactionTable data={canceledTransactions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionsComponent;
