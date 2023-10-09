import React from "react";
import Button from "../General/Button component/Button";
import Success from "./Success";
import naira from "../../Assets/Naira.svg";
import RemitanceFooter from "./RemitanceFooter";
import Select from "react-select";

export default function NairaRemitance({
  render,
  setRender,
  setInitialRender,
  formValue,
  handleForm,
  cancelProcess,
  submitForm,
  copyText,
  renderSuccess,
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
  changeInput,
  inputValueUpdate,
}) {
  const renderMainPage = () => {
    setRender(false);
    setInitialRender(true);
    cancelProcess();
  };

  const btnColor = "#0C6904";

  return (
    <form className="remitance-form d-flex flex-column justify-content-center align-items-center">
      <div className="items-container position-relative py-5">
        <section className="logo">
          <div>
            <img src={require("../../Assets/vector.png")} alt="" />
          </div>
        </section>

        <section className="info mt-5">
          <h3 className="text-center">
            <img src={require("../../Assets/Naira-logo.png")} alt="" /> Naira
            Remittance Setup
          </h3>
          <p className="text-danger text-center fw-bolder fs-5">
            Please note that your earnings with Leverpay will be remitted into
            this account
          </p>

          <p className="mt-5 text-center fs-4">Please fill the input below</p>
        </section>

        <section className="input-section">
          <div className="d-flex flex-column inputs-container mb-3">
            <label htmlFor="bank" id="select-bank">
              {!changeInput ? "Select Bank" : "Type Other Bank"}
            </label>
            {!changeInput ? (
              <>
                <Select
                  options={instituteOption}
                  onChange={(selectedOption) => selectOptions(selectedOption)}
                  value={selectedBank}
                  isSearchable={false}
                  components={{
                    Option: CustomOption,
                  }}
                  styles={customSelectStyles}
                />
              </>
            ) : (
              <div className="d-flex inputs-container-2">
                <input
                  type="text"
                  name="input1"
                  id="account-number"
                  className="input"
                  value={formValue.input1}
                  onChange={handleForm}
                />
              </div>
            )}
            <small
            className="change-input-state fs-6"
            onClick={() => inputValueUpdate()}
          >
            Can't find bank? click here!
          </small>
          </div>

          <div className="d-flex flex-column mb-3 inputs-container">
            <label htmlFor="Account-number" id="account-number">
              Account Number
            </label>
            <div className="d-flex inputs-container-2">
              <input
                type="number"
                name="input2"
                id="account-number"
                className="input"
                value={formValue.input2}
                onChange={handleForm}
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
            <label htmlFor="Account-name" id="account-name">
              Account Name
            </label>
            <div className="d-flex inputs-container-2">
              <input
                type="text"
                name="input3"
                id="account-name"
                className="input"
                onChange={handleForm}
                value={formValue.input3}
              />
            </div>
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
            icon={naira}
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

{/* <div className="d-flex flex-column mb-3 inputs-container">
            <label htmlFor="Narration" id="narration">
              Narration
            </label>
            <div className="d-flex inputs-container-2">
              <input
                type="text"
                name="input5"
                id="narration"
                className="input"
                onChange={handleForm}
                value={formValue.input5}
              />
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
          </div> */}