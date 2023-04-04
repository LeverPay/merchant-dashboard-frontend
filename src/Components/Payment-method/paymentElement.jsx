import React from "react";
import "./style.css";
import Form from "./form";

export default function PaymentElement() {
  return (
    <section className="payment-method d-flex flex-column justify-content-center px-4">
      <p className="mt-2 fw-bold mx-4">Payment Setup</p>
      <div className="form-container mx-4">
        <Form />
      </div>
    </section>
  );
}
