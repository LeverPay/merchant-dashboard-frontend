import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./invoice.css";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { blue } from "@mui/material/colors";

function Invoice({ className, data }) {
  const [id] = useState(nanoid);
  const [stateData, setStateData] = useState(data);
  const [value, setValue] = useState();
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
  }, [qrcode]);

  const date = new Date();
  const Morning_Afternoon = date.getHours() > 12 ? "pm" : "am";
  const minutes =
    date.getMinutes() < 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const timeofDay = date.getHours() + ":" + minutes + " " + Morning_Afternoon;
  const time = date.toDateString() + " " + timeofDay;

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

  useEffect(() => {
    if (stateData !== undefined || stateData !== null) {
      setValue(stateData);
    }
  }, [stateData]);

  console.log(value);

  return (
    <Container
      id="invoice"
      className={`pt-3 px-3 py-4 col-md-4 col-12 ${className}`}
    >
      <h4 className="text-center">{data?.tnx_reference_no}</h4>
      <div className="price_checkout">
        <span className="px-md-3">
          <h5>{data?.totalUSD}</h5>
          <h5>Total USDT</h5>
        </span>
        <span className="px-md-3">
          <h5>{data?.totalNGN}</h5>
          <h5>Total</h5>
        </span>
        <span className="px-md-3">
          <h5 style={{ color: data?.type === "credit" ? "green" : "red" }}>
            {parseFloat(data?.amount).toFixed(2)}
          </h5>
          <h5 style={{ color: "black" }}>
            {data?.statusName !== "Successful" ? data?.statusName : "Paid"}
          </h5>
        </span>
      </div>
      <div className="Invoice_details">
        <h3>DETAILS</h3>
        <Container fluid>
          <Row>
            <Col className="h5">Ref No:</Col>
            <Col className="h5 blue-color">{data?.reference_no}</Col>
          </Row>
          <Row>
            <Col className="row_details">Type</Col>
            <Col
              className="row_details_information"
              style={{ color: data?.type === "credit" ? "green" : "red" }}
            >
              {data?.type}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Amount</Col>
            <Col
              className="row_details_information blue-color"
              style={{ color: data?.type === "credit" ? "green" : "red" }}
            >
              {parseFloat(data?.amount).toFixed(2)}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Currency</Col>
            <Col className="row_details_information blue-color">Naira{data?.currency}</Col>
          </Row>
          <Row>
            <Col className="row_details">Created at</Col>
            <Col
              className="row_details_information blue-color"
              style={{ fontSize: "12px" }}
            >
              {formatDate(data?.created_at)}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Items</Col>
            <Col className="row_details_information blue-color">
              {data?.items}
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <div className="Buyer_details">
        <h3 className="blue-color">Buyer Information</h3>
        <h5 style={{ color: "#0d0c30" }}>Email</h5>
        <p style={{ color: "hsl(221, 69%, 55%)" }}>{data?.cus_email}</p>
      </div>
      <hr />
      <div className="Payment_received">
        <p style={{ color: "#0d0c30" }}>
          Payment Received for 
          <span style={{ color: "#1861ff" }}> {data?.product_name} Android Devices</span>
        </p>
        {/* <p style={{ color: "#0d0c30" }}>
          TXID:{" "}
          <span style={{ color: "#1861ff" }}>({data.txid.slice(0, 8)})</span>
        </p> */}
        <p style={{ color: "#0d0c30" }}>{data?.paymentTime}</p>
        <br />
        <main>
          <div>
            <h6>Invoice Paid at</h6>
            <h6>{data?.invoiceTime}</h6>
          </div>
        </main>
        
      </div>
      <hr />
    </Container>
  );
}

export default Invoice;
