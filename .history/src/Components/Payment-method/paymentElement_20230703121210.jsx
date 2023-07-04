import React from "react";
import "./style.css";
import Form from "./form";

export default function PaymentElement() {
  return (
    <section className="payment-method  flex-column justify-content-center px-4">
      <p className=" fw-bold " style={{ color: "black" }}>
        Payment Setup
      </p>
      <Form />
    </section>
  );
}
