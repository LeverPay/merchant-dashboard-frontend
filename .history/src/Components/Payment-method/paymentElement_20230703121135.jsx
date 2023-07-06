import React from "react";
import "./style.css";
import Form from "./form";

export default function PaymentElement() {
  return (
    <section className="payment-method d-flex flex-column justify-content-center ">
      <p className=" fw-bold " style={{ color: "black" }}>
        Payment Setup
      </p>
      <Form />
    </section>
  );
}
