import React, { useState, useEffect, useRef } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
import Invoice from "../Invoice/Invoice";
import InvoiceModal from "./InvoiceModal/InvoiceModal";
import Form from "../../Components/contact-support/form";
// import { allTransactions } from "../../../TestData";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const helpRef = useRef();
  const displayInvoice = (item) => {
    setShowInvoice(item);
    // console.log(showInvoice, showInvoice === null);
  };

  const showForm = () => {
    setDisplayForm(true);
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
              {props.data.headers.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((item, index) => (
              <tr>
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
                <td>{item.amount}</td>
                <td
                  onClick={() => {
                    displayInvoice(item);
                  }}
                  className="invoice-td"
                >
                  {item.invoice}
                </td>
                <td ref={helpRef} className={`help-td`} onClick={showForm}>
                  {item.help}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInvoice !== null && <InvoiceModal displayInvoice={displayInvoice} />}
      {displayForm && <Form setDisplayForm={setDisplayForm} />}
    </>
  );
};
export default TransactionTable;
