import React, { useEffect, useState } from "react";
import Slider from "react-slider-modal";
import "animate.css/animate.min.css";
// import Logo from "../../../assets/images/half-logo.png";
// import OTP from "../../../assets/images/otp.png";
import Icon from "../../Assets/group-account.png";
import Icon2 from "../../Assets/personal-account.png";
import "./business-account-form.css";
import { Link, NavLink } from "react-router-dom";
import AccountType from "../WelcomePage/AccountType";
import { CountrySelect } from "../../Components/CountrySelect";
// import TransactionReport from "../TransactionMessages/Transaction-report";
import PhoneInput from "react-phone-number-input"; // import "react-phone-input-2/lib/bootstrap.css";
import { countries, fetchInfo } from "../../Components/Endpoints/Endpoints";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
export default function BusinessAccountForm() {
  const [inputText, setInputText] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const { countryList, setCountryList } = useState();
  const [slideShow2, setSlideShow2] = useState(false);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const isAnonymous = true;
  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log("button clicked");
  };
  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };
  useEffect(() => {});
  const maxLength = 6;
  function handleInputChange(event) {
    const inputValue = event.target.value;
    setInputText(inputValue);

    if (inputValue.length === maxLength) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }
  const htmlData = () => {
    return (
      <>
        <div className="slider-container">
          <div className="sliderBody">
            <CreateAccountForm accType="business" />
          </div>
          <div className="sliderFooter">
            {/* <button
              className="btn btn-primary"
              onClick={() => setSlideShow(false)}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <button
        onClick={() => {
          setSlideShow2(!slideShow2);
        }}
        className="account-type-btn2"
      >
        <img src={Icon2} alt="" width="10%" />
        <h6>Business</h6>
        <p>Receive crypto payment and make payment with crypto</p>
      </button>

      <Slider
        className="otp-slide"
        id="demoID22"
        animation="zoom"
        speed="fast"
        closeIcon={(e) => {
          setSlideShow2(e);
        }}
        toggle={slideShow2}
        sliderStyle={{
          width: "550px",
          height: "90%",
          top: "50px",
          borderRadius: "20px",
          left: "35%",
        }}
        closeModal={() => {
          setSlideShow2(false);
        }}
        direction="bottom"
        render={htmlData()}
      />
    </>
  );
}
