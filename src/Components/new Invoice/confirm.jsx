import React from "react";
import Button from "../General/Button component/Button";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

export default function Confirm({ handleSubmit, token, setToken, setConfirm }) {
  const closeContainer = (e) => {
    e.preventDefault();
    setConfirm(false);
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle d-flex flex-column 
    justify-content-center px-4 py-3 confirm"
    >
      <h6>Please Check your mail/phone for otp code</h6>
      <input
        type="text"
        name="token"
        id=""
        onChange={(e) => setToken(e.target.value)}
        value={token}
      />
      <div className="mt-4 d-flex container justify-content-center align-items-center">
        <div className="d-flex justify-content-between">
          <Button
            style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
            click={handleSubmit}
          >
            Confirm Invoice
          </Button>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "#FC0019", color: "#ffffff" }}
            click={closeContainer}
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
