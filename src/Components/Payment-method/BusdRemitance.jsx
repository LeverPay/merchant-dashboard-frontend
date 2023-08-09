import React from "react";
import Button from "../General/Button component/Button";

export default function BusdRemitance({
  setRender,
  setInitialRender,
  formValue,
  handleForm,
  cancelProcess,
  submitForm,
  copyText,
}) {
  const renderMainPage = () => {
    setRender(false);
    setInitialRender(true);
    cancelProcess();
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
            <img src={require("../../Assets/busd-21.png")} alt="" /> BUSD
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
              Select Your Crypto Exchange Network
            </label>
            <select
              name="input1"
              id="select-bank"
              className="banks"
              onChange={handleForm}
            >
              <option value="Choose An Option" className="select-value">
                Choose An Option
              </option>
              <option value="Exchange Network1" className="select-value">
                Exchange Network1
              </option>
              <option value="Exchange Network2" className="select-value">
                Exchange Network2
              </option>
              <option value="Exchange Network3" className="select-value">
                Exchange Network3
              </option>
              <option value="Exchange Network4" className="select-value">
                Exchange Network4
              </option>
              <option value="Exchange Network5" className="select-value">
                Exchange Network5
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
                name="input2"
                id="account-number"
                className="input"
                onChange={handleForm}
                value={formValue.input2}
              />
              <span
                className="value-copy d-flex align-items-center"
                onClick={copyText}
              >
                <img src={require("../../Assets/copy-vector.png")} alt="" />
              </span>
            </div>
          </div>

          <div className="d-flex flex-column mt-4 inputs-container">
            <label htmlFor="Account-number" id="account-number">
              Preferred Narration
            </label>
            <div className="d-flex inputs-container-2">
              <input
                type="text"
                name="input3"
                id="account-number"
                className="input"
                onChange={handleForm}
                value={formValue.input3}
              />
              <span
                className="value-copy d-flex align-items-center"
                onClick={copyText}
              >
                <img src={require("../../Assets/copy-vector.png")} alt="" />
              </span>
            </div>
          </div>

          <div className="options-select mt-5 d-flex flex-column inputs-container">
            <label htmlFor="interval" id="payment-interval">
              payment interval
            </label>
            <select
              name="input4"
              id="payment-interval"
              className="payment-interval"
              onChange={handleForm}
            >
              <option value="Choose An Option" className="select-value">
                Choose An Option
              </option>
              <option value="Daily" className="select-value">
                Daily
              </option>
              <option value="Weekly" className="select-value">
                Weekly
              </option>
              <option value="Monthly" className="select-value">
                Monthly
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
            click={submitForm}
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
