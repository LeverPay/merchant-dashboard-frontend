import React from "react";
import TransactionsComponent from "../../Components/TransactionsComponent/TransactionsComponent";
import UserSelectComponent from "../../Components/UserSelectComponent/UserSelectComponent";
import "./transactions-page.css";
export const TransactionsPage = () => {
  return (
    <>
      <div className="col-md-12 transactions-page-container">
        <div className="transactionPage-heading">
          <h3>Transaction History</h3>
          <div className="col-md-2 transaction-select">
            <UserSelectComponent />
          </div>
        </div>
        <TransactionsComponent />
      </div>
    </>
  );
};
