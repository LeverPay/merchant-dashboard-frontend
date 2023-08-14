import React from "react";
import Button from "../General/Button component/Button";

export default function Success({ icon, btnColor, setRenderSuccess }) {
  return (
    <section className="success d-flex flex-column position-fixed px-2">
      <div className="success-items-container d-flex flex-column justify-content-center align-iems-center">
        <section className="logo-section">
          <div>
            <img src={require("../../Assets/vector.png")} alt="" />
          </div>
        </section>

        <section className="success-icon d-flex flex-column align-items-center justify-content-center">
          <div className="icon d-flex flex-column align-items-center justify-content-center">
            <img src={icon} alt="" width="40%" />
            <small className="text-success text-center">
              Your Remittance Method Has been Set Successfuly
            </small>
          </div>

          <div className="mt-5 container d-flex justify-content-center">
            <Button
              style={{
                backgroundColor: btnColor,
                color: "white",
                borderRadius: "0.3rem",
                padding: "0.3rem 0.6rem",
                width: "40%",
              }}
              click={() => setRenderSuccess(false)}
            >
              Close
            </Button>
          </div>
        </section>
      </div>

      <section className="footer-section d-flex justify-content-between">
        <div className="items-container d-flex justify-content-between">
          <div className="first-content d-flex">
            <img src={require("../../Assets/pad-lock.png")} alt="" />
            <small className="mx-2 fw-bolder">
              secured by <span style={{ color: "#082E88" }}>Leverpay</span>
            </small>
          </div>
        </div>

        <div className="second-content fw-bolder">
          <small style={{ color: "#082E88" }}>Feedback</small>
        </div>
      </section>
    </section>
  );
}
