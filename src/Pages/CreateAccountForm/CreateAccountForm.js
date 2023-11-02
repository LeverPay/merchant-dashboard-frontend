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
  const [showPassword1, setShowPassword1] = useState(false);
  const [v_email, setV_email] = useState("");
  const [renderVerify, setRenderVerify] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [person, setPerson] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    dob: "",
    gender: "Select gender",
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
      autoClose: 2000,
      hideProgressBar: true,
      theme: "light",
    });

  const fetchcountryData = async () => {
    //fetch country
    try {
      const req1 = await axios.get(baseUrl + countries);
      if (req1.status === 200) {
        const response1 = req1.data?.data?.map((el) => el);
        setCountryData(response1);
      }
    } catch (err) {
      errorNotify("something went wrong while getting country");
    }
  };
  useEffect(() => {
    fetchcountryData();
  }, []);

  const fetchState = async (id) => {
    try {
      id = person.country;
      const req2 = await axios.post(baseUrl + states, {
        country_id: id,
      });
      if (req2.status === 200) {
        const response = req2.data?.data;
        setStateData(response);
      }
    } catch (err) {
      errorNotify("Something went wrong while fetching states");
    }
  };

  useEffect(() => {
    if (person.country !== "") fetchState(person.country);
  }, [person.country]);

  const fetchcity = async (id) => {
    try {
      id = person.state;
      const req3 = await axios.post(baseUrl + cities, {
        state_id: id,
      });
      if (req3.status === 200) {
        const response = req3.data?.data;
        setCityData(response);
      }
    } catch (err) {
      errorNotify("something went wrong while fetching city");
    }
  };

  useEffect(() => {
    if (person.state !== "") fetchcity(person.state);
  }, [person.state]);
  // console.log(cityData, "is city data");

  // const handleChecked = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  function validateForm(e) {
    e.preventDefault();
    // Check if the First Name is an Empty string or not.

    if (person.firstName.length == 0) {
      errorNotify("Invalid Form, First Name cannot be empty");
      return;
    }

    // checks if last name is empty
    if (person.lastName.length == 0) {
      errorNotify("Invalid Form, Lastname cannot be empty");
      return;
    }

    const selectedDate = new Date(person.dob);

    // Get the current date
    const currentDate = new Date();

    // Calculate the minimum allowed date (5 years ago from the current date)
    const minAllowedDate = new Date(
      currentDate.getFullYear() - 10,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (person.dob.length == 0) {
      errorNotify("Invalid Form, birth date can not be empty");
    } else if (person.dob.length > 0) {
      if (selectedDate < minAllowedDate) {
        // chaecks if date of birth is empty
      } else if (selectedDate >= minAllowedDate) {
        errorNotify(
          "Date of birth is too recent. Must be at least 10 years ago."
        );
        return;
      }
    }

    if (person.gender.length == 0 || person.gender === "Select gender") {
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
      person.dob !== "" &&
      selectedDate < minAllowedDate
    ) {
      handleSubmit();
    }
  }

  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      setAnimate(true);
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
        successNotify("Signup Success ✔");
        localStorage.setItem("registered", "true");
        setAnimate(false);
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
      setAnimate(false);
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
              type="text"
              className="form-control"
              onChange={handleChange}
              name="otherName"
              value={person.otherName}
              id="othername"
            />
            <label htmlFor="lastname" id="lastname">
              Lastname
            </label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              name="lastName"
              value={person.lastName}
              id="lastname"
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
              <option value="">Select gender</option>
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
              <label htmlFor="phone number" id="phone">
                Phone Number
              </label>
              <PhoneInput
                value={value}
                onChange={setValue}
                placeholder="Phone number"
                required
                id="phone"
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
                placeholder="10 Alpha-numeric characters"
                onChange={handleChange}
                value={person.password}
                name="password"
                id="password"
              />{" "}
              <span onClick={toggleShowPassword} className="eye">
                {showPassword ? (
                  <img
                    className="image"
                    src={EyeClose}
                    alt="Scholar"
                    width="3%"
                  />
                ) : (
                  <img
                    className="image"
                    src={EyeOpen}
                    alt="Scholar"
                    width="3%"
                  />
                )}
              </span>
              <label htmlFor="confirm-password mt-2" id="confirm-password">
                Confirm Password
              </label>
              <input
                required
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                placeholder="Must be same as password"
                onChange={handleChange}
                name="confirmPassword"
                value={person.confirmPassword}
                id="confirm-password"
              />
              <span onClick={toggleShowPassword1} className="eye">
                {showPassword1 ? (
                  <img
                    className="image"
                    src={EyeClose}
                    alt="Scholar"
                    width="3%"
                  />
                ) : (
                  <img
                    className="image"
                    src={EyeOpen}
                    alt="Scholar"
                    width="3%"
                  />
                )}
              </span>
            </div>
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
                id="agree"
              />
              <label
                htmlFor="Accept"
                id="agree"
                style={{
                  fontFamily: "AgrandirBold",
                  fontSize: "12px",
                  marginLeft: "15px",
                }}
              >
                I agree to the
                <strong>
                  <span>
                    <a
                      href="https://leverpay.io/privacy-policy"
                      target="_blank"
                      style={{
                        color: "#2962F2",
                        textDecoration: "none",
                        marginLeft: "2px",
                      }}
                    >
                      Privacy Policy
                    </a>
                  </span>
                </strong>
                <strong>
                  <span
                    style={{
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    and
                  </span>
                </strong>
                <strong>
                  <span>
                    <a
                      href="https://leverpay.io/terms-conditions"
                      target="_blank"
                      style={{
                        color: "#2962F2",
                        textDecoration: "none",
                        marginLeft: "2px",
                      }}
                    >
                      Terms of Service
                    </a>
                  </span>
                </strong>
              </label>
            </div>
            <Button
              click={validateForm}
              style={{
                width: "100%",
                backgroundColor: "#0051FF",
                color: "#fff",
                paddingTop: "1%",
                paddingBottom: "1%",
              }}
              animate={animate}
              // className="acct-btn"
            >
              Create Account
            </Button>
            <p style={{ fontSize: "13px", marginTop: "4px", color: "black" }}>
              Already have an account?{" "}
              <Link
                to={"/"}
                style={{
                  color: "#2962F2",
                  fontWeight: "bolder",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </p>
            <p style={{ fontSize: "13px", marginTop: "2px", color: "black" }}>
              Already Registered?{" "}
              <Link
                onClick={continue_toVerification}
                style={{
                  color: "#2962F2",
                  fontWeight: "bolder",
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
