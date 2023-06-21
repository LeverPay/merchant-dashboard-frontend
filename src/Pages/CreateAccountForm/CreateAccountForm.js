import React, { useState, useEffect, useRef } from "react";
import "./create-account-form.css";
import { Link, NavLink } from "react-router-dom";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input";
import Button from "../../Components/General/Button component/Button";
import {
  fetchInfo,
  states,
  cities,
  baseUrl,
  signup,
} from "../../Components/Endpoints";
import axios from "axios";
import "./VerifyEmail.css";

export default function CreateAccountForm({ accType, countryList }) {
  const [firstName, setFirstName] = useState(""); // useState to store First Name
  const [lastName, setLastName] = useState(""); // useState to store Last Name
  const [email, setEmail] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [password, setPassword] = useState(""); // useState to store Password
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  // const [inputText, setInputText] = useState("");
  // const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [slideShow, setSlideShow] = useState(false);
  const [value, setValue] = useState("");
  const [statesData, setStatesData] = useState({});
  const [citiesData, setCitiesData] = useState({});
  const [cities_id, setCities_id] = useState();
  const [city, setCity] = useState();
  const [Address, setAddress] = useState("");
  const [renderForm, setRenderForm] = useState(true);

  // Generates an array for for inputs
  const inputs = Array(4).fill(0);
  // adds useRefs to inputs
  const inputRefs = inputs.map(() => useRef());

  const handleChange = (e, index) => {
    const { value } = e.target;

    //Tests if values is number
    if (/^\d*$/.test(value)) {
      if (value.length === 1) {
        if (index < inputs.length - 1) {
          // Focus on the next input if value is a number
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };


  // Populate data automatically on all input fields
  const handlePaste = (e) => {
    e.preventDefault();
    // Get copied data
    const pastedData = e.clipboardData.getData("text/plain").trim();
    // Check if data is a number and length is == 4
    if (/^\d{4}$/.test(pastedData)) {
      inputs.forEach((_, i) => {
        inputRefs[i].current.value = pastedData[i];
        inputRefs[i].current.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      });
    }
  };

  const verifyMail = (e) => {
    e.preventDefault();
    const _inputValues = inputRefs.map((el) => el.current.value);
    const value_As_String = _inputValues.toString().replace(/,/g, "");
    console.log(value_As_String);
  };

  const fetchData = async (country_id) => {
    try {
      const response = await axios.post(baseUrl + states, {
        country_id: country_id,
      }); // Replace with your API endpoint
      setStatesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataState = async (state_id) => {
    try {
      const response = await axios.post(baseUrl + cities, {
        state_id: state_id,
      }); // Replace with your API endpoint
      setCitiesData(response.data);
      setCities_id(state_id);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataCity = async (state_id) => {
    try {
      const response = await axios.post(baseUrl + cities, {
        state_id: cities_id,
      }); // Replace with your API endpoint
      console.log(state_id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCountryId !== "") {
      fetchData(selectedCountryId);
    }
  }, [selectedCountryId]);

  useEffect(() => {
    if (city !== "") {
      fetchDataCity(city);
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (city !== "") {
      fetchDataState(selectedStateId);
    }
  }, [selectedStateId]);

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  function validateForm(e) {
    e.preventDefault();
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

    //Check if address length is an Empty string or not

    if (Address.length == 0) {
      alert("Invalid Form, Address cannot be empty");
      return;
    }

    // Check if BusinuessName is an Empty string

    if (BusinessName.length == 0) {
      alert("Invalid Form, Business name cannot be empty");
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
    handleSubmit();
  }
  function setCountry(country_id) {
    console.log("called back with " + country_id + "");
    // if (country_id !== "") {
    setSelectedCountryId(country_id);
    // }
  }

  function setStateCallBack(state_id) {
    console.log("called back with state id  " + state_id + "");
    setSelectedStateId(state_id);
  }

  function setCityCallBack(state_id) {
    console.log("called back with state id  " + state_id + "");
    setCity(state_id);
  }

  async function handleSubmit() {
    try {
      const register = await axios.post(baseUrl + signup, {
        first_name: firstName,
        last_name: lastName,
        address: Address,
        password: password,
        email: email,
        business_name: BusinessName,
        phone: value,
        password: password,
        country_id: selectedCountryId,
        state_id: selectedStateId,
        city_id: city,
      });
      console.log(register.data.data.merchant);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!renderForm ? (
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
          <h6>Address</h6>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
          />
          <h6>BusinessName</h6>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <h6>Select Country</h6>
          <CountrySelect
            countyList={countryList}
            callback={setCountry}
            selector="country_name"
          />
          {selectedCountryId !== "" ? (
            <>
              <h6>Select State</h6>
              <CountrySelect
                countyList={statesData}
                callback={setStateCallBack}
                selector="state_name"
              />
            </>
          ) : (
            ""
          )}
          {selectedStateId != "" ? (
            <>
              <h6>Select City</h6>
              <CountrySelect
                countyList={citiesData}
                callback={setCityCallBack}
                selector="city_name"
              />
            </>
          ) : (
            ""
          )}
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
            onClick={validateForm}
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
      ) : (
        <form className="p-5">
          <center>
            <p>Please Verify Your Account</p>
            <div>
              <h5>A code has beeen sent to your mail</h5>
            </div>
          </center>

          <div className="d-flex">
            {inputs.map((_, index) => {
              return (
                <input
                  type="text"
                  ref={inputRefs[index]}
                  maxLength={1}
                  className="mt-5 mx-2 verify-input fs-1 text-center"
                  onChange={(e) => handleChange(e, index)}
                  onPaste={handlePaste}
                />
              );
            })}
          </div>

          <div>
            <small className="fs-5 d-flex justify-content-center">
              Didn't get code? <Link>Click to resend?</Link>
            </small>
          </div>

          <div className="mt-5 d-flex justify-content-center">
            <Button
              style={{
                backgroundColor: "#2962F2",
                width: "80%",
                color: "#fff",
                fontSize: "1.5rem",
              }}
              click={verifyMail}
            >
              Verify Account
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
