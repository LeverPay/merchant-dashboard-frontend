import React from "react";
import GenerateInvoice from "../../Components/new Invoice/GenerateInvoice";
import Failed_Invoice_Page from "../Failed Invoice/Failed_Invoice_Page";
import Unpaid_invoice from "../Unpaid Invoice/Unpaid_invoice_Page";
import Canceled_invoice from "../Canceled Invoice/Canceled_invoice_Page";
import { useLocation } from "react-router-dom";

export default function Generate_Invoice_Page() {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  return (
    <div className="generate-invoice-container d-flex justify-content-center align-items-center mx-4 px-4">
      {path === "/create-invoice/failed" ? (
        <Failed_Invoice_Page />
      ) : path === "/create-invoice/canceled" ? (
        <Canceled_invoice />
      ) : path === "/create-invoice/unpaid" ? (
        <Unpaid_invoice />
      ) : (
        <GenerateInvoice />
      )}
    </div>
  );
}
