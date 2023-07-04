import React from "react";
import "./style.css";
import Form from "./form";

export default function PaymentElement() {
  return (
    <section className="payment-method  px-4">
      <p className="mt-2 fw-bold mx-4">Payment Setup</p>
      <Form />
    </section>
  );
}
