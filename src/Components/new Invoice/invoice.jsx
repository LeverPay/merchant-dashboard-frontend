import React from "react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Invoice({ details, closeMe }) {
  const close = () => {
    closeMe((prev) => (prev = false));
  };

  return (
    <div className="invoice-details px-3 py-5">
      <div className="d-flex justify-content-between">
        <div>
          <img src={require("../../Assets/vector.png")} alt="logo" />
        </div>

        <div onClick={close}>
          <AiOutlineCloseCircle size="40px" color="red" />
        </div>
      </div>

      {details && (
        <div className="px-5 mt-5 py-4 fw-bolder fs-5">
          <p>
            Invoice Id: <span className="fw-lighter">{details.uuid}</span>
          </p>
          <p>
            Product Name:{" "}
            <span className="fw-lighter">{details.product_name}</span>
          </p>
          <p>
            Price: <span className="fw-lighter">{details.price}</span>{" "}
          </p>
          <p>
            Product Description:{" "}
            <span className="fw-lighter">{details.product_description}</span>
          </p>
          <p>
            Product Price: <span className="fw-lighter">{details.price}</span>
          </p>
          <p>
            Fee: <span className="fw-lighter">{details.fee}</span>
          </p>
          <p>
            Vat: <span className="fw-lighter">{details.vat}</span>
          </p>
          <p>
            Product Description:{" "}
            {details.product_description !== "" ||
            details.product_description !== null ? (
              <span className="fw-lighter">{details.product_description}</span>
            ) : (
              <span className="fw-lighter">N/A</span>
            )}
          </p>
          <p>
            Customer First Name:{" "}
            <span className="fw-lighter">{details.user?.first_name}</span>
          </p>
          <p>
            Customer Last Name:{" "}
            <span className="fw-lighter">{details.user?.last_name}</span>
          </p>
          <p>
            Customer Phone:{" "}
            <span className="fw-lighter">{details.user?.phone}</span>
          </p>
          <p>
            Total price: <span className="fw-lighter">{details.total}</span>
          </p>
        </div>
      )}
    </div>
  );
}
