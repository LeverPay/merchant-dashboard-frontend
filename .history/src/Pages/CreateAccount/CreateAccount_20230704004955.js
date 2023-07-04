import React, { useState, useEffect } from "react";
import Slider from "react-slider-modal";
import "animate.css/animate.min.css";
import axios from "axios";

import Icon from "../../Assets/group-account.png";
import "./create-account.css";
import { Link, NavLink } from "react-router-dom";
import { fetchInfo, countries, baseUrl } from "../../Components/Endpoints";

import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

import { ToastContainer, toast } from "react-toastify";

export default function CreateAccount(props) {
  const [slideShow, setSlideShow] = useState(false);
  const [countriesData, setCountries] = useState({});

  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log("button clicked");
  };

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl + countries); // Replace with your API endpoint
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [slideShow]);
  const { bg, bg2 } = props;
  const htmlData = () => {
    return (
      <>
        <div className="slider-container">
          <div className="sliderBody col-md-6">
            <CreateAccountForm
              accType={props.accType}
              countryList={countriesData}
              notify={notify}
              success={success}
            />
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
      </button>{" "}
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
          // width: "550px",
          height: "90%",
          top: "50px",
          borderRadius: "20px",
          // left: "35%",
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
