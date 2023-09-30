import React from "react";
import Button from "../General/Button component/Button";
import { useState } from "react";

export default function Success_msg1({
  success,
  messageBody,
  closeParent,
  closeItem,
  closegrandContainer,
}) {
  const [close, setClose] = useState(false);

  const closeAll = () => {
    setClose(false);
    closeParent(false);
    closeItem(false);
    closegrandContainer();
  };

  return (
    <div className="success-msg-1">
      <div className="header-section d-flex align-items-center justify-content-center py-2">
        <img src={require("../../Assets/vector.png")} alt="logo" />
        <h2 className="fw-bolder header-text fs-2 mx-2 mt-2">Leverpay</h2>
      </div>

      <div className="message-container px-3 py-2">
        <div className="hero fw-bolder fs-6 mb-3 mt-4">
          <h2>[Leverpay]</h2>
        </div>
        <div className="">
          <h4 className="fw-bolder fs-6 mb-3">Subscription {success}</h4>
        </div>

        <div className="message">
          <p className="text-left">{messageBody}</p>
          <p>
            Feel free to reach out via: <br />
            Email: funding@leverpay.io <br />
            Whatsapp: +2349060898687
          </p>
        </div>

        <div className="mb-4 mt-0">
          <Button
            style={{ backgroundColor: "#0051FF", color: "#ffffff" }}
            click={closeAll}
          >
            Close
          </Button>
        </div>

        <div className="image-section">
          <img
            width="100%"
            src={require("../../Assets/confirm-subscription.png")}
            alt="image"
          />
          <hr />
          <p className="text-center red-hr">Stay Connected</p>
        </div>

        <div className="footer-section d-flex justify-content-around px-2">
          <div className="d-flex justify-content-center">
            <div className="mx-2">
              <img src={require("../../Assets/sec-padlock.png")} alt="lock" />
            </div>

            <div>
              <p style={{ color: "#000" }}>
                Secured by{" "}
                <span style={{ color: "#0051FF" }} className="fw-bolder">
                  Leverpay
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
