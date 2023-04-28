// import "./invoice-modal.css";
// import Invoice from "../../InvoicePage/Invoice/Invoice";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Invoice from "../../Invoice/Invoice";
// import Invoice from "../../InvoicePage/Invoice/Invoice";

class PrintInvoice extends React.Component {
  render() {
    let item = localStorage.getItem("currentInvoice");
    if (item !== undefined && item !== "undefined") item = JSON.parse(item);
    return <Invoice className="className" invoice={item} />;
  }
}

export default PrintInvoice;
