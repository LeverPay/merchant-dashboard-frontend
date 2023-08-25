import React from "react";
import Button from "../General/Button component/Button";
import busd from "../../Assets/busd-22.svg";
import Success from "./Success";
import RemitanceFooter from "./RemitanceFooter";
import Select from "react-select";

export default function BusdRemitance({
  renderSuccess,
  setRender,
  setInitialRender,
  formValue,
  handleForm,
  cancelProcess,
  submitForm,
  copyText,
  setRenderSuccess,
  selectOptions,
  selectOptions2,
  selectedBank,
  setSelectedBank,
  renderLogos,
  intervals,
  selectedInterval,
  CustomOption,
  instituteOption,
  customSelectStyles,
}) {
  const renderMainPage = () => {
    setRender(false);
    setInitialRender(true);
    cancelProcess();
  };

  const btnColor = "#F2AE00";

  return (
    <form className="remitance-form d-flex flex-column justify-content-center align-items-center">
      <div className="items-container py-5">
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

          <p className="mt-5 text-center fs-4">Please fill the input below</p>
        </section>

        <section>
          <div className="d-flex flex-column mb-3 inputs-container">
            <label htmlFor="bank" id="select-bank">
              Select Your Crypto Exchange Network
            </label>
            <Select
              options={instituteOption}
              onChange={(opt) => selectOptions(opt)}
              value={selectedBank}
              isSearchable={false}
              components={{
                Option: CustomOption,
              }}
              styles={customSelectStyles}
            />
          </div>

          <div className="d-flex flex-column mb-3 inputs-container">
            <label htmlFor="Account-number" id="account-number">
              Wallet Address
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

          <div className="d-flex flex-column mb-3 inputs-container">
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

          <div className="options-select mb-3 d-flex flex-column inputs-container">
            <label htmlFor="interval" id="payment-interval">
              payment interval
            </label>
            <Select
              options={intervals}
              onChange={(opt) => selectOptions2(opt)}
              value={selectedInterval}
              isSearchable={false}
              components={{
                Option: CustomOption,
              }}
              styles={customSelectStyles}
            />
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

        {renderSuccess && (
          <Success
            icon={busd}
            btnColor={btnColor}
            setRenderSuccess={setRenderSuccess}
            setRender={setRender}
            setInitialRender={setInitialRender}
          />
        )}
      </div>

      <RemitanceFooter />
    </form>
  );
}
