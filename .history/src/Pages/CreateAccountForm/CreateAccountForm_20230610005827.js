import React, { useState, useEffect } from "react";
import "./create-account-form.css";
import { Link, NavLink } from "react-router-dom";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input";
import { fetchInfo, countries, baseUrl } from "../../Components/Endpoints";

export default function CreateAccountForm({ accType, countryList }) {
  const [firstName, setFirstName] = useState(""); // useState to store First Name
  const [lastName, setLastName] = useState(""); // useState to store Last Name
  const [email, setEmail] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [password, setPassword] = useState(""); // useState to store Password
  const [selectedCountryId, setSelectedCountryId] = useState("");
  // const [inputText, setInputText] = useState("");
  // const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [slideShow, setSlideShow] = useState(false);
  const [value, setValue] = useState("");
  const [statesData, setStatesData] = useState({});

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };
  function validateForm() {
    // Check if the First Name is an Empty string or not.

    if (firstName.length == 0) {
      alert("Invalid Form, First Name can not be empty");
      return;
    }

    // Check if the Email is an Empty string or not.

    if (email.length == 0) {
      alert("Invalid Form, Email Address can not be empty");
      return;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (password.length < 8) {
      alert(
        "Invalid Form, Password must contain greater than or equal to 8 characters."
      );
      return;
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0;
    // variable to count lowercase characters in the password.
    let countLowerCase = 0;
    // variable to count digit characters in the password.
    let countDigit = 0;
    // variable to count special characters in the password.
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++;
      } else {
        if (password[i] == password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++;
        }
        if (password[i] == password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++;
        }
      }
    }

    if (countLowerCase == 0) {
      // invalid form, 0 lowercase characters
      alert("Invalid Form, 0 lower case characters in password");
      return;
    }

    if (countUpperCase == 0) {
      // invalid form, 0 upper case characters
      alert("Invalid Form, 0 upper case characters in password");
      return;
    }

    if (countDigit == 0) {
      // invalid form, 0 digit characters
      alert("Invalid Form, 0 digit characters in password");
      return;
    }

    if (countSpecialCharacters == 0) {
      // invalid form, 0 special characters characters
      alert("Invalid Form, 0 special characters in password");
      return;
    }

    // if all the conditions are valid, this means that the form is valid

    alert("Form is valid");
  }
  function setCountry(country_id) {
    console.log("called back with " + country_id + "");
    // if (country_id !== "") {
    setSelectedCountryId(country_id);
    // }
  }

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
        <CountrySelect countyList={countryList} callback={setCountry} />
        <CountrySelect countyList={countryList} />/
        {/* <CountrySelect countyList={countryList} /> */}
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
        <h6>Password</h6>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
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
          type="submit"
          onClick={() => {
            validateForm();
          }}
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
