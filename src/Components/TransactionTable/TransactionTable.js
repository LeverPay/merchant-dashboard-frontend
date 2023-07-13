import React, { useState, useEffect, useRef } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
import Invoice from "../Invoice/Invoice";
import InvoiceModal from "./InvoiceModal/InvoiceModal";
import Form from "../../Components/contact-support/form";
// import { allTransactions } from "../../../TestData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const [transactionId, setTransactionId] = useState();
  const [clickedItem, setClickedItem] = useState({});
  const helpRef = useRef();
  const displayInvoice = (item) => {
    setShowInvoice(item);
  };

  const click = (item) => {
    const value = props.data.data.find((el) => el === item);
    setClickedItem(value);
  };

  useEffect(() => {
    if (showInvoice !== null) {
      localStorage.setItem("currentInvoice", JSON.stringify(showInvoice));
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
              {props.data.headers.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((item, index) => (
              <tr key={index}>
                <td style={{ fontWeight: "bold" }}>{item.name}</td>
                <td>{item.date}</td>
                <td style={{ color: item.color || "black" }}>
                  <img
                    src={item.status.icon}
                    alt="smiley"
                    className="col-md-"
                  />
                  {item.status.statusName}
                </td>
                <td>{!props.hidebalance ? "---" : item.amount}</td>
                <td
                  onClick={() => {
                    displayInvoice(item);
                    click(item);
                  }}
                  className="invoice-td"
                >
                  {item.invoice}
                </td>
                {/* <td
                  ref={helpRef}
                  className={`help-td fs-5`}
                  onClick={() => showForm(item)}
                >
                  {item.help}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInvoice !== null && (
        <InvoiceModal displayInvoice={displayInvoice} data={clickedItem} />
      )}
    </>
  );
};
export default TransactionTable;
