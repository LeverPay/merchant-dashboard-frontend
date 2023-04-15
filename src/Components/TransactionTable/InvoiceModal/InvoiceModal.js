import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Invoice from "../../Invoice/Invoice";
// import Invoice from "../../InvoicePage/Invoice/Invoice";
// import InvoicePage from "../../InvoicePage/InvoicePage";
// import Close from "../../../assets/images/close-icon.png";

import "./invoice-modal.css";
const InvoiceModal = (props) => {
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [str, setStr] = useState({});
  const handleClose = () => {
    setShowStatus(true);
    setShow(false);

    props.displayInvoice(null);
  };
  useEffect(() => {
    if (show === false && showStatus === false) {
      setShow(true);
      setShowStatus(true);
    }
  }, [show, showStatus]);
  useEffect(() => {
    let item = localStorage.getItem("currentInvoice");
    if (item !== undefined && item !== "undefined")
      setInvoice(JSON.parse(item));
    console.log(invoice);
  });
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>
          {" "}
          <Invoice className="className" invoice={invoice} />
          <p
            onClick={handleClose}
            style={{
              color: "#fff",
              cursor: "pointer",
              marginTop: "-40px",
              marginBottom: "30px",
            }}
          >
            close
          </p>
          {/* <i class="icofont-close-circled" onClick={handleClose}></i> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InvoiceModal;
