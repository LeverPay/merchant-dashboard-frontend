import { color } from "framer-motion";
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
          <fieldset className="fieldset">
            <legend className="legend"> Product Details</legend>
          <p>
            Product Name:{" "}
            <span className="fw-lighter">{details.product_name}</span>
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
          </fieldset>
          <fieldset className="fieldset">
          <legend className="legend">Customer Details</legend>
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
          </fieldset>
          <fieldset className="fieldset">
            <legend className="legend">Product Amount</legend>
         
          <p>
            Product Price:{" "}
            <span className="fw-lighter">
              {details.price ? Math.floor(details.price) : ""}
            </span>
          </p>
          <p>
            Transaction Fee:{" "}
            <span className="fw-lighter">
              {parseFloat(details?.fee).toFixed(3)}
            </span>
          </p>
          <p>
            Vat: <span className="fw-lighter">{parseFloat(details?.vat).toFixed(3)}</span>
          </p>
          
          
          <p>
            Total price:{" "}
            <span className="fw-lighter">{parseFloat(details?.total).toFixed(3)} {details.currency}</span>
          </p>
          </fieldset>
        </div>
        
      )}
      <div className="footer-section d-flex justify-content-around px-2">
          <div className="d-flex justify-content-center">
            <div className="mx-2">
              <img src={require("../../Assets/sec-padlock.png")} alt="lock" />
            </div>

            <div>
              <p>
                Secured by{" "}
                <span style={{ color: "#0051FF" }} className="fw-bolder">
                  Leverpay
                </span>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
