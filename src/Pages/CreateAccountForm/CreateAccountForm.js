import React, { useState, useEffect, useRef } from "react";
import "./create-account-form.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input";
import Button from "../../Components/General/Button component/Button";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
import {
  fetchInfo,
  states,
  cities,
  baseUrl,
  signup,
  verify_Mail,
  resendVerification_Token,
} from "../../Components/Endpoints";
import axios from "axios";
import "./VerifyEmail.css";

export default function CreateAccountForm({
  accType,
  countryList,
  notify,
  success,
}) {
  const [firstName, setFirstName] = useState(""); // useState to store First Name
  const [lastName, setLastName] = useState(""); // useState to store Last Name
  const [email, setEmail] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [password, setPassword] = useState(""); // useState to store Password
  const [confirmPassword, setConfirmPassword] = useState(""); // useState to store Password
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
  const [renderForm, setRenderForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [v_email, setV_email] = useState();

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

  const navigate = useNavigate();

  const verifyMail = async (e) => {
    e.preventDefault();
    const _inputValues = inputRefs.map((el) => el.current.value);
    const value_As_String = _inputValues.toString().replace(/,/g, "");
    console.log(value_As_String, v_email);

    try {
      const request = await axios.post(baseUrl + verify_Mail, {
        email: v_email,
        token: value_As_String,
      });
      if (request.status === 200) {
        success(request.data.message);
        setTimeout(() => {
          // Route to signin page
          navigate("/");
        }, 3000);
      } else {
        notify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      notify(err.response.data.message);
    }
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  function validateForm(e) {
    e.preventDefault();
    // Check if the First Name is an Empty string or not.

    if (firstName.length == 0) {
      notify("Invalid Form, First Name can not be empty");
      return;
    }

    // Check if the Email is an Empty string or not.

    if (email.length == 0) {
      notify("Invalid Form, Email Address can not be empty");
      return;
    } else if (!emailRegex.test(email)) {
      notify("Invalid mail format");
    } else {
    }

    //Check if address length is an Empty string or not

    if (Address.length == 0) {
      notify("Invalid Form, Address cannot be empty");
      return;
    }

    // Check if BusinuessName is an Empty string

    if (BusinessName.length == 0) {
      notify("Invalid Form, Business name cannot be empty");
      return;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (password.length < 10) {
      notify(
        "Invalid Form, Password must contain more than or equal to 10 characters."
      );
    } else if (!passwordRegex.test(password)) {
      notify(
        "password must be 10characters long, must contain at least a special character and a number"
      );
    } else if (password !== confirmPassword) {
      notify("password mismatch");
    } else {
    }

    if (!isChecked) {
      notify("Accept Terms of Services to continue");
      return;
    }

    if (
      isChecked &&
      password === confirmPassword &&
      email.length > 0 &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      Address.length > 0 &&
      BusinessName.length > 0 &&
      selectedCountryId !== "" &&
      selectedStateId !== "" &&
      city !== ""
    ) {
      handleSubmit();
    }
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
      if (register.status === 200) {
        console.log(register);
        success("Signup Success ✔");
        localStorage.setItem("registered", "true");
        const cookie = localStorage.getItem("registered");
        // Continue process
        if (cookie) {
          setRenderForm(true);
        }
        setV_email(register.data.data.email);
      } else {
        notify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        notify("Mail or phone already taken");
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  }

  const resend_Verification_Token = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(baseUrl + resendVerification_Token, {
        email: v_email,
      });
      console.log(request);
      if (request.status === 200) {
        success(`New token has been sent to ${v_email}`);
      } else {
        notify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

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
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <h6>Password</h6>
          <input
            required
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password should be 10 characters long and must contain at least one special character a number"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <span onClick={toggleShowPassword}>
            {showPassword ? (
              <img className="" src={EyeClose} alt="Scholar" width="5%" />
            ) : (
              <img
                className=""
                src={EyeOpen}
                alt="Scholar"
                width="5%"
                height="5%"
              />
            )}
          </span>
          <h6>Confirm Password</h6>
          <input
            required
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Must be same as password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={toggleShowPassword}>
            {showPassword ? (
              <img className="" src={EyeClose} alt="Scholar" width="5%" />
            ) : (
              <img
                className=""
                src={EyeOpen}
                alt="Scholar"
                width="5%"
                height="5%"
              />
            )}
          </span>
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
            Already have an account?{" "}
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
              <h5>A code has beeen sent to {v_email}</h5>
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
              Didn't get code?{" "}
              <Link onClick={resend_Verification_Token}>Click to resend</Link>
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
