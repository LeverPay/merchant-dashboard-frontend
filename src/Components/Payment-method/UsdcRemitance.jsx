import React from "react";
import Button from "../General/Button component/Button";

export default function UsdcRemitance({ setRender, setInitialRender }) {
  const renderMainPage = () => {
    setRender(false);
    setInitialRender(true);
  };

  return (
    <form className="remitance-form d-flex flex-column justify-content-center align-items-center">
      <div className="items-container">
        <section className="logo">
          <div>
            <img src={require("../../Assets/vector.png")} alt="" />
          </div>
        </section>

        <section className="info mt-5">
          <h3 className="text-center">
            <img src={require("../../Assets/icon-61.png")} alt="" /> USDC
            Remittance Setup
          </h3>
          <p className="text-danger text-center fw-bolder fs-5">
            Please note that your earnings with Leverpay will be remitted into
            this account
          </p>

          <p className="mt-5 text-center fw-bolder fs-4">
            Please fill the input below
          </p>
        </section>

        <section>
          <div className="d-flex flex-column inputs-container">
            <label htmlFor="bank" id="select-bank">
              Select Bank
            </label>
            <select name="" id="select-bank" className="banks">
              <option value="Bank1" className="select-value">
                Bank1
              </option>
              <option value="Bank2" className="select-value">
                Bank2
              </option>
              <option value="Bank3" className="select-value">
                Bank3
              </option>
              <option value="Bank4" className="select-value">
                Bank4
              </option>
              <option value="Bank5" className="select-value">
                Bank5
              </option>
            </select>
          </div>

          <div className="d-flex flex-column mt-4 inputs-container">
            <label htmlFor="Account-number" id="account-number">
              Account Number
            </label>
            <div className="d-flex inputs-container-2">
              <input
                type="text"
                name=""
                id="account-number"
                className="input"
              />
              <span className="value-copy d-flex align-items-center">
                <img src={require("../../Assets/copy-vector.png")} alt="" />
              </span>
            </div>
          </div>

          <div className="d-flex flex-column mt-4 inputs-container">
            <label htmlFor="Account-name" id="account-name">
              Account Name
            </label>
            <input type="text" name="" id="account-name" className="input" />
          </div>

          <div className="options-select mt-5 d-flex flex-column inputs-container">
            <label htmlFor="interval" id="payment-interval">
              payment interval
            </label>
            <select name="" id="payment-interval" className="payment-interval">
              <option value="Daily" className="select-value">
                Daily
              </option>
              <option value="Monthly" className="select-value">
                Daily
              </option>
              <option value="Weekly" className="select-value">
                Daily
              </option>
            </select>
          </div>
        </section>

        <div className="mt-4">
          <Button
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#0C6904",
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            Save
          </Button>
        </div>

        <div className="mt-2">
          <Button
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#F21010",
              color: "#fff",
              fontSize: "1rem",
            }}
            click={renderMainPage}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
