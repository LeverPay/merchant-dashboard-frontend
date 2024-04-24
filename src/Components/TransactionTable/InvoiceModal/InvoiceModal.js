import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Invoice from "../../Invoice/Invoice";
import ReactToPrint from "react-to-print";

import "./invoice-modal.css";
import PrintInvoice from "./PrintInvoice";
const InvoiceModal = (props) => {
  let componentRef = useRef();

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
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

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>
          {" "}
          <Invoice className="className" data={props.data} />
          <div className="flexy flexyM invoicebtn">
            {" "}
            <div className="closebtn">
              {" "}
              <button onClick={handleClose}>Close</button>
            </div>
            <ReactToPrint
              trigger={() => <button className="printbtn">Print</button>}
              content={() => componentRef}
            />{" "}
          </div>
          <div style={{ display: "none" }}>
            <PrintInvoice ref={(el) => (componentRef = el)} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InvoiceModal;
