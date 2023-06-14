import React, { useState, useEffect } from "react";
import "./create-account-form.css";
import { Link, NavLink } from "react-router-dom";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input";

export default function CreateAccountForm({ accType, countryList }) {
  const [firstName, setFirstName] = useState(""); // useState to store First Name
  const [lastName, setLastName] = useState(""); // useState to store Last Name
  const [email, setEmail] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  // const [inputText, setInputText] = useState("");
  // const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [slideShow, setSlideShow] = useState(false);
  const [value, setValue] = useState("");

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };
  // const maxLength = 6;
  // function handleInputChange(event) {
  //   const inputValue = event.target.value;
  //   setInputText(inputValue);

  //   if (inputValue.length === maxLength) {
  //     setSubmitButtonDisabled(false);
  //   } else {
  //     setSubmitButtonDisabled(true);
  //   }
  // }

  return (
    <>
      <form className="acc-form">
        {" "}
        <center>
          <h5>Create your {accType} account</h5>
        </center>
        <h6>First Name</h6>
        <input
          type="text"
          required
          className="form-control"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <h6>Last Name</h6>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
        />
        <h6>BusinessName</h6>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <h6>Select Country</h6>
        <CountrySelect countyList={countryList} />
        <h6>Phone Number</h6>
        <PhoneInput
          value={value}
          onChange={setValue}
          placeholder="Mobile number"
          required
        />
        <h6>Email address</h6>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <h6>Email address</h6>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <div className="flexy flexyM">
          <input
            required
            type="checkbox"
            name="color"
            checked={isChecked}
            onChange={handleChecked}
            style={{
              height: "height:15px",
              width: "15px",
            }}
          />
          <span
            style={{
              fontFamily: "AgrandirBold",

              fontSize: "12px",
              marginTop: "15px",
              marginLeft: "15px",
            }}
          >
            {" "}
            I agree to the <strong>Terms of Service</strong> and
            <strong> Privacy Policy.</strong>
          </span>
        </div>
        <button
          // disabled={submitButtonDisabled}
          className="acct-btn"
          // onClick={handleClick}
        >
          Create Account
        </button>
        <p style={{ fontSize: "13px", marginTop: "4px", color: "black" }}>
          Already have an count?{" "}
          <Link
            to={"/"}
            style={{
              color: "#2962F2",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
