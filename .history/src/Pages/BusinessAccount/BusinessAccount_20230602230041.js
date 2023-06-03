import React, { useEffect, useState } from "react";
import Slider from "react-slider-modal";
import "animate.css/animate.min.css";

import Icon from "../../Assets/group-account.png";
import Icon2 from "../../Assets/personal-account.png";
import "./business-account-form.css";
import { Link, NavLink } from "react-router-dom";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

export default function BusinessAccountForm() {
  const [slideShow2, setSlideShow2] = useState(false);

  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log("button clicked");
  };

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
