import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Invoice from "./Invoice/Invoice";
import TransactionsComponent from "../../Components/TransactionsComponent/TransactionsComponent";
import UserSelectComponent from "../../Components/UserSelectComponent/UserSelectComponent";
import "./transactions-page.css";
import { Link, NavLink } from "react-router-dom";
import Invoice from "../../Components/Invoice/Invoice";
import Carousel from "react-bootstrap/Carousel";
// import PrintInvoice from "../../Components/TransactionTable/InvoiceModal/PrintInvoice";

export const TransactionsPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let componentRef = useRef();

  return (
    <>
      <div className="col-md-12 transactions-page-container">
        <div className="transactionPage-heading">
          <h3>Transaction History</h3>
          <div className="col-md-2 transaction-select">
            <UserSelectComponent />
          </div>
        </div>
        <div className="col-md-12 transact-div">
          {" "}
          <TransactionsComponent />
        </div>
      </div>
      {/* <center>
        <Link to={"/invoice"} className="invoice-link">
          Go to Invoices
        </Link>
      </center> */}

      <center>
        {" "}
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ fontFamily: "AgrandirBold" }}
        >
          View all invoices
        </Button>
      </center>

      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Transaction Invoice</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <Invoice className="className" /> */}

          <Carousel variant="dark" interval={3000}>
            <Carousel.Item>
              <Invoice className="className" />
            </Carousel.Item>
            <Carousel.Item>
              <Invoice className="className" />
            </Carousel.Item>
            <Carousel.Item>
              <Invoice className="className" />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <div style={{ display: "none" }}>
            <PrintInvoice ref={(el) => (componentRef = el)} />
          </div> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionsPage;
