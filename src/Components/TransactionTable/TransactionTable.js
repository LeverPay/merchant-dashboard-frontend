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
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [showMore, setShowMore] = useState(true);
  const displayInvoice = (item) => {
    setShowInvoice(item);
  };

  const click = (item) => {
    setClickedItem(item);
    displayInvoice(item);
  };

  const toggleShowMore = () => {
    if (itemsToShow + 5 >= props?.data?.length) {
      setItemsToShow(props?.data?.length);
      setShowMore(false);
    } else {
      setItemsToShow(itemsToShow + 5);
      setShowMore(true);
    }
  };

  const toggleShowLess = () => {
    setItemsToShow(5);
    setShowMore(true);
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
              {props.data
                .slice(0, itemsToShow)
                .sort((a, b) => b.created_at - a.created_at)
                .map((item, index) => (
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
          {props.data.length > itemsToShow ? (
            <div className="btn-container mt-5">
              <button
                type=""
                className="table-btn px-2 py-2 d-flex"
                onClick={toggleShowMore}
              >
                View More
                <span>
                  <IoMdArrowDropdown size="20px" />
                </span>
              </button>
            </div>
          ) : (
            props?.data?.length > 5 && (
              <div className="btn-container mt-5">
                <button
                  type=""
                  className="table-btn px-2 py-2 d-flex"
                  onClick={toggleShowLess}
                >
                  Show Less
                  <span>
                    <IoMdArrowDropup size="20px" />
                  </span>
                </button>
              </div>
            )
          )}
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
