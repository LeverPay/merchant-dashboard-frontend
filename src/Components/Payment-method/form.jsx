import React, { useRef, useState, useContext } from "react";
import Button from "../General/Button component/Button";
import PaymentImg from "../../Assets/payment-img.png";
import { baseUrl, update_payment_Method } from "../Endpoints/Endpoints";
import axios from "axios";
import Notifications from "../General/NotificationContext";
import TokenContext from "../User-Token/TokenContext";
import NairaRemitance from "./NairaRemitance";
import BusdRemitance from "./BusdRemitance";
import UsdcRemitance from "./UsdcRemitance";
import TetherRemitance from "./TetherRemitance";

export default function Form() {
  const [initialRender, setInitialRender] = useState(true);
  const { notify, success } = useContext(TokenContext);
  const [naira, setNaira] = useState(false);
  const [usdc, setUsdc] = useState(false);
  const [busd, setBusd] = useState(false);
  const [tether, setTether] = useState(false);
  const [input, setInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const cancel = () => {
    setInput((prev) => ({
      ...prev,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    }));
  };

  const copyValue = (e) => {
    const parentValue = e.target
      .closest(".inputs-container-2")
      .querySelector(".input").value;

    if (!navigator.clipboard) {
      notify("Clipboard is not supported");
    } else {
      if (parentValue !== "") {
        navigator.clipboard
          .writeText(parentValue)
          .then(() => success("Data copied to clipboard"))
          .catch((err) => notify("Something Went wrong"));
      } else {
        notify("Input value is empty");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.input1 !== "" &&
      input.input1 !== "Choose An Option" &&
      input.input2 !== "" &&
      input.input3 !== "" &&
      input.input4 !== "" &&
      input.input4 !== "Choose An OPtion"
    ) {
      console.log(input);
      cancel();
      if (naira) {
        setNaira(false);
        setInitialRender(true);
      } else if (busd) {
        setBusd(false);
        setInitialRender(true);
      } else if (usdc) {
        setUsdc(false);
        setInitialRender(true);
      } else {
        setTether(false);
        setInitialRender(true);
      }
    } else {
      notify("One or more input(s) are empty");
    }
  };

  const showNaira = () => {
    setNaira(!naira);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showUsdc = () => {
    setUsdc(!usdc);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showBusd = () => {
    setBusd(!busd);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showTether = () => {
    setTether(!tether);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  return (
    <>
      {initialRender && (
        <>
          <div className="heading-text">
            <h3 className="fs-4 text-center mb-4">
              Please click on the currency tab to select your preferred
              remittance method.
            </h3>
          </div>
          <div className="remitance-btn-container">
            <div></div>
            <button className="remitance-btn" onClick={showNaira}>
              <img
                src={require("../../Assets/naira-12.png")}
                alt=""
                className="mx-2"
              />
              <p className="fs-3 text-center">Naira</p>
            </button>
            <button className="remitance-btn" onClick={showUsdc}>
              <img
                src={require("../../Assets/icon-61.png")}
                alt=""
                className="mx-2"
              />
              <p className="fs-3 text-center">USDC</p>
            </button>
            <button className="remitance-btn" onClick={showBusd}>
              <img
                src={require("../../Assets/busd-21.png")}
                alt=""
                className="mx-2"
              />
              <p className="fs-3 text-center">BUSD</p>
            </button>
            <button className="remitance-btn" onClick={showTether}>
              <img
                src={require("../../Assets/usdt-42.png")}
                alt=""
                className="mx-2"
              />
              <p className="fs-3 text-center">USDT</p>
            </button>
          </div>
          <div className="form-container flexy ">
            <div className="form  col-md-12">
              <div className="flexy ">
                <div className="col-md-6 paymentimg d-flex align-items-end">
                  <div className="d-flex px-4">
                    <img
                      src={require("../../Assets/ep-info-filled.png")}
                      alt=""
                    />
                    <small className="text-wrap fs-6 mx-4 fw-bolder">
                      Also note that Leverpay allows you to setup more than one
                      remitance method. in this case, we will to create one of
                      your preferred options.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {naira && (
        <NairaRemitance
          setRender={setNaira}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
        />
      )}
      {usdc && (
        <UsdcRemitance
          setRender={setUsdc}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
        />
      )}
      {busd && (
        <BusdRemitance
          setRender={setBusd}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
        />
      )}
      {tether && (
        <TetherRemitance
          setRender={setTether}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
        />
      )}
    </>
  );
}
