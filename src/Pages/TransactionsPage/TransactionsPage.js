import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TransactionsComponent from "../../Components/TransactionsComponent/TransactionsComponent";
import UserSelectComponent from "../../Components/UserSelectComponent/UserSelectComponent";
import "./transactions-page.css";
import Invoice from "../../Components/Invoice/Invoice";
import Carousel from "react-bootstrap/Carousel";
import Loading from "../../Components/General/loading animation/loading";
import axios from "axios";
import {
  baseUrl,
  get_transactions,
} from "../../Components/Endpoints/Endpoints";
import TokenContext from "../../Components/User-Token/TokenContext";

export const TransactionsPage = () => {
  const [show, setShow] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [animate, setAnimate] = useState(false);
  const { notify } = useContext(TokenContext);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getTransactions();
  };

  const getTransactions = async () => {
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + get_transactions, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(req.data);
      if (req.status === 200) {
        setInvoices(req.data.data); // Store the invoices in state
        setAnimate(false);
        setShow(true);
      }
    } catch (err) {
      console.log(err);
      setAnimate(false);
      notify("Something went wrong while getting all transaction details");
    }
  };

  useEffect(() => {
    // When invoices data changes, update the number of invoices
    numberOfInvoices = invoices.length;
  }, [invoices]);

  let numberOfInvoices = invoices.length;

  return (
    <>
      <div className="col-md-12 transactions-page-container">
        {/* ... */}
        <div className="col-md-12 transact-div">
          <TransactionsComponent />
        </div>
      </div>

      <center>
        <Button
          onClick={handleShow}
          style={{ fontFamily: "AgrandirBold" }}
          className="modal-btn"
        >
          View all invoices
        </Button>
      </center>

      {!animate && show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Carousel variant="dark" interval={3000}>
              {/* Generate multiple Carousel.Items */}
              {invoices.map((invoiceItem, index) => (
                <Carousel.Item key={index}>
                  {/* Pass the individual invoice data to the Invoice component */}
                  <Invoice className="className" data={invoiceItem} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        animate && (
          <div className="d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        )
      )}
    </>
  );
};

export default TransactionsPage;
