import React, { useState } from "react";
import Slider from "react-slider-modal";
import "animate.css/animate.min.css";

import Icon from "../../Assets/group-account.png";
import "./personal-account-form.css";
import { Link, NavLink } from "react-router-dom";

import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

export default function PersonalAccount(props) {
  const [slideShow, setSlideShow] = useState(false);

  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log("button clicked");
  };
  const { bg, bg2 } = props;
  const htmlData = () => {
    return (
      <>
        <div className="slider-container">
          <div className="sliderBody">
            <CreateAccountForm accType={props.accType} />
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
          setSlideShow(!slideShow);
        }}
        className="account-type-btn"
        style={{ background: bg }}
      >
        <img src={props.icon} alt="" width="10%" style={{ background: bg2 }} />
        <h6>{props.accType}?</h6>
        <p>Receive crypto payment and make payment with crypto</p>
      </button>

      <Slider
        className="otp-slide"
        id={props.id}
        animation="zoom"
        speed="fast"
        closeIcon={(e) => {
          setSlideShow(e);
        }}
        toggle={slideShow}
        sliderStyle={{
          width: "550px",
          height: "90%",
          top: "50px",
          borderRadius: "20px",
          left: "35%",
        }}
        closeModal={() => {
          setSlideShow(false);
        }}
        direction="bottom"
        render={htmlData()}
      />
    </>
  );
}
