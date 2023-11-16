import React from "react";
import "./affilate.css";
import logo from "../../Assets/vector.png";
import lock from "../../Assets/sec-padlock.png";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../General/Button component/Button";

export default function Registeration() {
  return (
    <div className="affilate-reg-container px-5 py-5 d-flex flex-column justify-content-center">
      <div className="registeration-content px-5 py-5 rounded">
        <div className="images-section d-flex justify-content-between">
          <div>
            <img src={logo} alt="leverpay-logo" />
          </div>
          {/* <div>
            <IoIosCloseCircle size="40px" color="#fd3003" />
          </div> */}
        </div>

        <div className="affilate-reg-header">
          <h1 className="fw-bolder text-center fs-5 mb-2">
            Affilate Registeration
          </h1>
          <p className="text-center">
            Please fill in your new affilate data below to generate a new
            affilate code
          </p>
        </div>

        <div className="affilate-reg-inputs-container d-flex flex-column justify-content-center px-5">
          <div className="inputs-container">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              name=""
              id="first-name"
              className="input rounded mb-2"
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              name=""
              id="last-name"
              className="input rounded mb-2"
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="user-mail">Email</label>
            <input
              type="email"
              name=""
              id="user-mail"
              className="input rounded mb-2"
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="phone-number">phone</label>
            <input
              type="number"
              name=""
              id="phone-number"
              className="input rounded mb-2"
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="percent-split">Percentage-split</label>
            <input
              type="number"
              name=""
              id="percent-split"
              className="input rounded mb-2"
            />
          </div>
        </div>

        <div className="affilate-btn-container mt-3 mb-3">
          <div className="d-flex justify-content-center mb-2">
            <Button
              style={{
                backgroundColor: "#2962f2",
                color: "#fff",
                width: "50%",
                padding: "5px",
              }}
            >
              Save
            </Button>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              style={{
                backgroundColor: "#fd3003",
                color: "#fff",
                width: "50%",
                padding: "5px",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="affilate-reg-footer d-flex justify-content-center align-items-center mt-2">
          <img src={lock} alt="secured" className="mx-3" />
          <p className="m-0">
            Secured by{" "}
            <span className="fw-bolder" style={{ color: "#2962f2" }}>
              Leverpay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
