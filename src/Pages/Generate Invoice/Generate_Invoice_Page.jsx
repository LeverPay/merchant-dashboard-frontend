import React from "react";
import GenerateInvoice from "../../Components/new Invoice/GenerateInvoice";
import History from "../../Components/new Invoice/History";
import { useLocation } from "react-router-dom";

export default function Generate_Invoice_Page() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="generate-invoice-container d-flex justify-content-center align-items-center mx-4 px-4">
      {path === "history" ? <History /> : <GenerateInvoice />}
    </div>
  );
}
