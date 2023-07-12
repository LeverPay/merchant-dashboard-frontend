import React from "react";
import { useState } from "react";
import Button from "../General/Button component/Button";
import { BiArrowBack } from "react-icons/bi";

export default function Cancel({
  cancelInvoice,
  inputVal,
  setInputVal,
  setCancel,
  hideForm
}) {
  const handleChange = (e) => {
    const { value } = e.target;

    setInputVal((prevInputVal) => ({
      ...prevInputVal,
      reason: value,
    }));
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle d-flex flex-column 
  justify-content-center px-4 py-3 cancel"
    >
      <h6 className="fs-3 fw-bold text-center">Reason For This?</h6>
      <div className="d-flex grp justify-content-between fs-5 my-2">
        <label htmlFor="Reason1" id="check1">
          Item Sold Out:
        </label>
        <input
          type="radio"
          name="reason"
          id="check1"
          onChange={handleChange}
          checked={inputVal.reason === "Item Sold Out"}
          value="Item Sold Out"
        />
      </div>
      <div className="d-flex grp justify-content-between fs-5 my-2">
        <label htmlFor="Reason2" id="check2">
          User violated Agreement:
        </label>
        <input
          type="radio"
          name="reason"
          id="check2"
          onChange={handleChange}
          checked={inputVal.reason === "User Violated Agreement"}
          value="User Violated Agreement"
        />
      </div>
      <div className="d-flex flex-column grp fs-5 my-2">
        <label htmlFor="Reason3" id="check3">
          Other:
        </label>
        <textarea
          name="reason"
          id="check3"
          onChange={handleChange}
          value={inputVal.reason}
          rows="5"
          cols="10"
        ></textarea>
      </div>
      <div className="mt-4 d-flex container justify-content-center align-items-center">
        <div className="d-flex justify-content-between">
          <Button
            style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
            click={cancelInvoice}
          >
            Confirm
          </Button>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "#FC0019", color: "#ffffff" }}
            click={() => hideForm()}
          >
            Back
            <span className="ms-2">
              <BiArrowBack />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
