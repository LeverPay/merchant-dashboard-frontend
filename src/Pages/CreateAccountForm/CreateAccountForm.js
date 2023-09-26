import React, { useState, useEffect, useRef } from "react";
import "./create-account-form.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input";
import Button from "../../Components/General/Button component/Button";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
import "react-phone-number-input/style.css";
import {
  fetchInfo,
  states,
  cities,
  baseUrl,
  signup,
  verify_Mail,
  resendVerification_Token,
  countries,
} from "../../Components/Endpoints";
import axios from "axios";
import "./VerifyEmail.css";
import { toast } from "react-toastify";
import Verify from "./verify";

export default function CreateAccountForm({ accType }) {
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [v_email, setV_email] = useState("");
  const [renderVerify, setRenderVerify] = useState(false);

  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    surName: "",
    dob: "",
    gender: "Male",
    address: "",
    businessName: "",
    rcNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    starter: false,
    registered: false,
    agree: false,
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPerson((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });

  const successNotify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      theme: "light",
    });

  const fetchcountryData = async () => {
    //fetch country
    const req1 = await axios.get(baseUrl + countries);
    const response1 = req1.data?.data?.map((el) => el);
    setCountryData(response1);
  };
  useEffect(() => {
    fetchcountryData();
  }, []);

  const fetchState = async (id) => {
    id = person.country;
    const req2 = await axios.post(baseUrl + states, {
      country_id: id,
    });
    const response = req2.data?.data;
    setStateData(response);
  };

  useEffect(() => {
    if (person.country !== "") fetchState(person.country);
  }, [person.country]);

  const fetchcity = async (id) => {
    id = person.state;
    const req3 = await axios.post(baseUrl + cities, {
      state_id: id,
    });
    const response = req3.data?.data;
    console.log(response);
    setCityData(response);
  };

  useEffect(() => {
    if (person.state !== "") fetchcity(person.state);
    console.log(person.state);
  }, [person.state]);
  // console.log(cityData, "is city data");

  // const handleChecked = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  function validateForm(e) {
    e.preventDefault();
    // Check if the First Name is an Empty string or not.

    if (person.firstName.length == 0) {
      errorNotify("Invalid Form, First Name can not be empty");
      return;
    }

    // checks if last name is empty
    if (person.surName.length == 0) {
      errorNotify("Invalid Form, Sur Name can not be empty");
      return;
    }

    const selectedDate = new Date(person.dob);

    // Get the current date
    const currentDate = new Date();

    // Calculate the minimum allowed date (5 years ago from the current date)
    const minAllowedDate = new Date(
      currentDate.getFullYear() - 5,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (person.dob.length == 0) {
      errorNotify("Invalid Form, birth date can not be empty");
      if (selectedDate >= minAllowedDate) {
        // chaecks if date of birth is empty
      } else if (selectedDate < minAllowedDate) {
        errorNotify(
          "Date of birth is too recent. Must be at least 5 years ago."
        );
        return;
      }
    }

    if (person.gender.length == 0) {
      errorNotify("Invalid Form, gender can not be empty");
      return;
    }
    // Check if the Email is an Empty string or not.
    if (person.email.length == 0) {
      errorNotify("Invalid Form, Email Address can not be empty");
      return;
    } else if (!emailRegex.test(person.email)) {
      errorNotify("Invalid mail format");
    } else {
    }

    //Check if address length is an Empty string or not

    if (person.address.length == 0) {
      errorNotify("Invalid Form, Address cannot be empty");
      return;
    }

    //checks if country value is empty
    if (person.country === "") {
      errorNotify(
        "counrty value cannot be empty, please select a country to get state"
      );
      return;
    }

    // chacks if state value is empty
    if (person.state === "") {
      errorNotify(
        "state value cannot be empty, please select a state to get city"
      );
      return;
    }

    // checks if city value is empty
    if (person.city === "") {
      errorNotify("city value cannot be empty");
      return;
    }

    if (value === "") {
      errorNotify("phone number cannot be empty and must be valid!");
    }

    // if (person.registered && person.starter) {
    //   errorNotify("Please select only one business category");
    //   return;
    // }

    // Check if BusinuessName is an Empty string
    if (person.businessName.length == 0) {
      errorNotify("Invalid Form, Business name cannot be empty");
      return;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (person.password.length < 10) {
      errorNotify(
        "Invalid Form, Password must contain more than or equal to 10 characters."
      );
    } else if (!passwordRegex.test(person.password)) {
      errorNotify(
        "password must be 10characters long, must contain at least a special character and a number"
      );
    } else if (person.password !== person.confirmPassword) {
      errorNotify("password mismatch");
    } else {
    }

    if (!person.agree) {
      errorNotify("Accept Terms of Services to continue");
      return;
    }

    if (
      person.agree &&
      person.password === person.confirmPassword &&
      person.email.length > 0 &&
      emailRegex.test(person.email) &&
      passwordRegex.test(person.password) &&
      person.address.length > 0 &&
      person.businessName.length > 0 &&
      person.city !== "" &&
      person.state !== "" &&
      person.country !== "" &&
      value !== "" &&
      person.dob !== ""
    ) {
      handleSubmit();
    }
  }

  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      const register = await axios.post(baseUrl + signup, {
        first_name: person.firstName,
        last_name: person.lastName,
        address: person.address,
        password: person.password,
        email: person.email,
        business_name: person.businessName,
        phone: value,
        country_id: person.country,
        state_id: person.state,
        city_id: person.city,
      });
      console.log(register);
      if (register.status === 200) {
        console.log(register);
        successNotify("Signup Success ✔");
        localStorage.setItem("registered", "true");
        const cookie = localStorage.getItem("registered");
        // Continue process
        if (cookie) {
          setRenderVerify(true);
        }
        setV_email(register.data.data.email);
      } else {
        errorNotify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 422) {
        errorNotify(err.response?.data?.message);
      } else {
        if (err.response !== undefined) {
          errorNotify(err.response.data.message);
        } else {
          errorNotify("Something went wrong :(");
        }
      }
    }
  }

  const continue_toVerification = () => {
    setRenderVerify(true);
  };

  return (
    <>
      {!renderVerify && (
        <form className="acc-form">
          <div className="acc-form-content">
            {" "}
            <center>
              <h5>Create your {accType} account</h5>
            </center>
            <label htmlFor="firstname" id="firstname">
              First Name
            </label>
            <input
              type="text"
              required
              name="firstName"
              className="form-control"
              onChange={handleChange}
              id="firstname"
              value={person.firstName}
            />
            <label htmlFor="othername" id="othername">
              Othername
            </label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              name="lastName"
              value={person.lastName}
              id="othername"
            />
            <label htmlFor="surname" id="surname">
              Surname
            </label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              name="surName"
              value={person.surName}
              id="surname"
            />
            <label htmlFor="gender" id="gender">
              Gender
            </label>
            <select
              required
              // type="text"
              className="form-control"
              onChange={handleChange}
              id="gender"
              value={person.gender}
              name="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div>
              <label htmlFor="date of birth" id="dob">
                Date of Birth
              </label>
              <input
                required
                type="date"
                className="form-control"
                onChange={handleChange}
                name="dob"
                id="dob"
                value={person.dob}
              />
            </div>
            <label htmlFor="Address" id="address">
              Address
            </label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              id="address"
              value={person.address}
              name="address"
            />
            <label htmlFor="business-name" id="business">
              BusinessName
            </label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              value={person.businessName}
              name="businessName"
              id="business"
            />
            <label htmlFor="rc-number" id="rc-number">
              Rc Number
            </label>
            <input
              required
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder="optional"
              value={person.rcNumber}
              name="rcNumber"
              id="rc-number"
            />{" "}
            <label htmlFor="country" id="country">
              Select Country
            </label>
            <select
              name="country"
              value={person.country}
              onChange={handleChange}
              className="form-control"
              id="country"
            >
              {countryData !== null ? (
                countryData?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.country_name}
                  </option>
                ))
              ) : (
                <option value="">No value to display</option>
              )}
            </select>
            {person.country !== "" && (
              <>
                <div>
                  <label htmlFor="state" id="state">
                    Select State
                  </label>
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="state"
                    value={person.state}
                    id="state"
                  >
                    {stateData !== null ? (
                      stateData?.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.state_name}
                        </option>
                      ))
                    ) : (
                      <option value="">No value to display</option>
                    )}
                  </select>
                </div>
              </>
            )}
            {person.state !== "" && (
              <>
                <div>
                  <label htmlFor="city" id="city">
                    Select City
                  </label>
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="city"
                    value={person.city}
                    id="city"
                  >
                    {cityData !== null ? (
                      cityData?.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.city_name}
                        </option>
                      ))
                    ) : (
                      <option value="">No value to display</option>
                    )}
                  </select>
                </div>
              </>
            )}
            <div className="mt-5">
              <label htmlFor="phone number">Phone Number</label>
              <PhoneInput
                value={value}
                onChange={setValue}
                placeholder="Mobile number"
                required
              />
            </div>
            <label htmlFor="email" id="mail">
              Email address
            </label>
            <input
              required
              type="email"
              className="form-control"
              onChange={handleChange}
              name="email"
              value={person.email}
              id="mail"
            />{" "}
            <div>
              <label htmlFor="password" id="password">
                Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password should be 10 characters long and must contain at least one special character a number"
                onChange={handleChange}
                value={person.password}
                name="password"
                id="password"
              />{" "}
              <span onClick={toggleShowPassword} className="eye">
                {showPassword ? (
                  <img className="" src={EyeClose} alt="Scholar" width="5%" />
                ) : (
                  <img
                    className="image"
                    src={EyeOpen}
                    alt="Scholar"
                    width="5%"
                    height="5%"
                  />
                )}
              </span>
              <label htmlFor="confirm-password mt-2" id="confirm-password">
                Confirm Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Must be same as password"
                onChange={handleChange}
                name="confirmPassword"
                value={person.confirmPassword}
                id="confirm-password"
              />
              <span onClick={toggleShowPassword} className="eye">
                {showPassword ? (
                  <img className="" src={EyeClose} alt="Scholar" width="5%" />
                ) : (
                  <img
                    className="image"
                    src={EyeOpen}
                    alt="Scholar"
                    width="5%"
                    height="5%"
                  />
                )}
              </span>
            </div>
            {/* <div className="question-container">
              <div className="question-1-container d-flex flex-column mt-4">
                <div className="d-flex">
                  <input
                    required
                    type="checkbox"
                    name="starter"
                    checked={person.starter}
                    onChange={handleChange}
                    id="starter"
                  />
                  <label
                    htmlFor="starter-business"
                    id="starter"
                    className="mx-2"
                  >
                    Starter Business
                  </label>
                </div>
                <p>
                  I’m testing my idea with real customers and preparing to
                  register my company
                </p>
              </div>

              <div className="question-2-container d-flex flex-column">
                <div className="d-flex">
                  <input
                    required
                    type="checkbox"
                    name="registered"
                    checked={person.registered}
                    onChange={handleChange}
                    id="registered"
                  />
                  <label
                    htmlFor="registered-business"
                    id="registered"
                    className="mx-2"
                  >
                    Registered Business
                  </label>
                </div>
                <p>
                  My business has the approval, documentation and license
                  require to operate legally
                </p>
              </div>
            </div> */}
            <div className="flexy flexyM mt-4 mb-2">
              <input
                required
                type="checkbox"
                name="agree"
                checked={person.agree}
                onChange={handleChange}
                style={{
                  height: "15px",
                  width: "15px",
                }}
              />
              <span
                id="agree"
                style={{
                  fontFamily: "AgrandirBold",

                  fontSize: "12px",
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
            <p style={{ fontSize: "13px", marginTop: "4px", color: "black" }}>
              Already Registered?{" "}
              <Link
                onClick={continue_toVerification}
                style={{
                  color: "#2962F2",
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                continue your to verification
              </Link>
            </p>
          </div>
        </form>
      )}
      {renderVerify && <Verify mail={v_email} renderSignUp={setRenderVerify} />}
    </>
  );
}
