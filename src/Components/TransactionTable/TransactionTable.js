import React, { useState, useEffect, useRef } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
import Invoice from "../Invoice/Invoice";
import InvoiceModal from "./InvoiceModal/InvoiceModal";
import Form from "../../Components/contact-support/form";
// import { allTransactions } from "../../../TestData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success from "../../Assets/success.png";
import Loading from "../General/loading animation/loading";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const [transactionId, setTransactionId] = useState();
  const [clickedItem, setClickedItem] = useState(null);
  const helpRef = useRef();
  const displayInvoice = (item) => {
    setShowInvoice(item);
  };

  const click = (item) => {
    setClickedItem(item);
    displayInvoice(item);
  };

  const formatDate = (createdAt) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", options);
  };

  const headers = ["Date", "Amount", "Status", "More"];

  useEffect(() => {
    if (showInvoice !== null || showInvoice !== undefined) {
      localStorage.setItem("currentInvoice", JSON.stringify(showInvoice));
    } else {
      localStorage.setItem("currentInvoice", null);
    }
  }, [showInvoice]);
  return (
    <>
      {!props.animate ? (
        <div className="transactions-table-container">
          <table className="col-md-12 col-12">
            <thead>
              <tr>
                {headers.map((item, i) => (
                  <th key={i}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.created_at)}</td>

                  <td>
                    {!props.hidebalance
                      ? "---"
                      : parseFloat(item.amount).toFixed(2)}
                  </td>
                  <td style={{ color: "green" }}>
                    <img src={success} alt="smiley" className="col-md-" />
                    {item.status === 1 ? "Successful" : "Pending"}
                  </td>
                  <td
                    onClick={() => {
                      click(item);
                    }}
                    className="invoice-td"
                  >
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Loading />
        </div>
      )}
      {showInvoice !== null && (
        <InvoiceModal displayInvoice={displayInvoice} data={showInvoice} />
      )}
    </>
  );
};
export default TransactionTable;
