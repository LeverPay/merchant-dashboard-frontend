import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./invoice.css";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

function Invoice({ className }) {
  const [id] = useState(nanoid);

  const [qrcode, setQrcode] = useState(id);

  useEffect(() => {
    QRCode.toDataURL(
      id,
      {
        margin: 1,
        width: 70,
        color: {
          dark: "#1C1A2E",
          light: "#F49B09",
        },
      },
      (err, id) => {
        err ? console.log("err") : setQrcode(id);
      }
    );
  });

  const date = new Date();
  const Morning_Afternoon = date.getHours() > 12 ? "pm" : "am";
  const minutes =
    date.getMinutes() < 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const timeofDay = date.getHours() + ":" + minutes + " " + Morning_Afternoon;
  const time = date.toDateString() + " " + timeofDay;

  return (
    <Container
      id="invoice"
      className={`pt-3 px-3 py-4 col-md-4 col-12 ${className}`}
    >
      <h4 className="text-center">{id}</h4>
      <div className="price_checkout">
        <span className="px-md-3">
          <h5>$420.89</h5>
          <h5>Total USD</h5>
        </span>
        <span className="px-md-3">
          <h5>0.45656</h5>
          <h5>Total ETH</h5>
        </span>
        <span className="px-md-3">
          <h5 style={{ color: "#0EB500" }}>$420.89</h5>
          <h5 style={{ color: "black" }}>Paid(ETH)</h5>
        </span>
      </div>
      <div className="Invoice_details">
        <h3>INVOICE DETAILS</h3>
        <Container fluid>
          <Row>
            <Col className="h5">Order ID</Col>
            <Col className="h5 blue-color">Order1</Col>
          </Row>
          <Row>
            <Col className="row_details">Status</Col>
            <Col
              className="row_details_information"
              style={{ color: "#0EB500" }}
            >
              Successful
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Confirmations</Col>
            <Col className="row_details_information blue-color">40</Col>
          </Row>
          <Row>
            <Col className="row_details">Currency</Col>
            <Col className="row_details_information blue-color">ETH</Col>
          </Row>
          <Row>
            <Col className="row_details">Created at</Col>
            <Col
              className="row_details_information blue-color"
              style={{ fontSize: "12px" }}
            >
              {time}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Items</Col>
            <Col className="row_details_information blue-color">
              Iphone 13 pro max
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <div className="Buyer_details">
        <h3 className="blue-color">Buyer Information</h3>
        <h5 style={{ color: "#0d0c30" }}>Email</h5>
        <p style={{ color: "hsl(221, 69%, 55%)" }}>Jamiltextile001@gmail.com</p>
      </div>
      <hr />
      <div className="Payment_received">
        <p style={{ color: "#0d0c30" }}>
          Payment Recieved for{" "}
          <span style={{ color: "#1861ff" }}>4.0245800ETH</span>{" "}
        </p>
        <p style={{ color: "#0d0c30" }}>
          TXID: <span style={{ color: "#1861ff" }}>( {id.slice(0, 8)} )</span>
        </p>
        <p style={{ color: "#0d0c30" }}>{time}</p>
        <br />
        <main>
          <div>
            <h6>Invoice Created</h6>
            <h6>{time}</h6>
          </div>
          {/* <div>
            {qrcode && <img alt="" className="qrcodeCon" src={qrcode} />}
          </div> */}
        </main>
      </div>
      <hr />
    </Container>
  );
}

export default Invoice;
