import React, { useRef, useState, useContext } from "react";
import Button from "../General/Button component/Button";
import PaymentImg from "../../Assets/payment-img.png";
import { baseUrl, update_payment_Method } from "../Endpoints/Endpoints";
import axios from "axios";
import Notifications from "../General/NotificationContext";
import TokenContext from "../User-Token/TokenContext";
import NairaRemitance from "./NairaRemitance";
export default function Form() {
  const [initialRender, setInitialRender] = useState(true);
  const [naira, setNaira] = useState(false);
  const [usdc, setUsdc] = useState(false);
  const [busd, setBusd] = useState(false);
  const [tether, setTether] = useState(false);

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
          <div className="remitance-btn-container">
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
                    <small className="text-wrap fs-6 mx-4 fw-bold">
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
      {naira && <NairaRemitance />}
    </>
  );
}
