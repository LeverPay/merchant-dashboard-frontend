import React, { useState, useEffect } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
// import { allTransactions } from "../../../TestData";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const displayInvoice = (item) => {
    setShowInvoice(item);
    // console.log(showInvoice, showInvoice === null);
  };
  useEffect(() => {
    if (showInvoice !== null) {
      localStorage.setItem("currentInvoice", showInvoice);
    } else {
      localStorage.setItem("currentInvoice", undefined);
    }
  }, [showInvoice]);
  return (
    <>
      <div className="transactions-table-container">
        <table className="col-md-12 col-12">
          <thead>
            <tr>
              {props.data.headers.map((item) => (
                <th>{item}</th>
              ))}{" "}
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((item, index) => (
              <tr>
                <td style={{ fontWeight: "bold" }}>{item.name}</td>
                <td>{item.date}</td>
                <td style={{ color: item.color || "black" }}>
                  {" "}
                  <img
                    src={item.status.icon}
                    alt="smiley"
                    className="col-md-"
                  />{" "}
                  {item.status.statusName}
                </td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TransactionTable;
