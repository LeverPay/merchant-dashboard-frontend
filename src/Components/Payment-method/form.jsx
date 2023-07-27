import React, { useRef, useState, useContext } from "react";
import Button from "../General/Button component/Button";
import PaymentImg from "../../Assets/payment-img.png";
import { baseUrl, update_payment_Method } from "../Endpoints/Endpoints";
import axios from "axios";
import Notifications from "../General/NotificationContext";
import TokenContext from "../User-Token/TokenContext";
export default function Form() {
  const { notify, success } = useContext(TokenContext);
  const [Input, setInput] = useState({
    UsdT: false,
    Busd: false,
    UsdC: false,
    Naira: false,
    Fiat: false,
    duration: "Daily",
  });

  const [DisabledBtn, setDisabledBtn] = useState(true);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const handleChange = (e) => {
    const { type, checked, value, name } = e.target;
    if (
      ref1.current.checked ||
      ref2.current.checked ||
      ref3.current.checked ||
      ref4.current.checked ||
      ref5.current.checked
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let value1, value2, value3, value4, value5;
  let iconName1, iconName2, iconName3, iconName4, iconName5;

  const handleSubmit = (e) => {
    e.preventDefault();

    const initial = [
      Input.Busd,
      Input.Fiat,
      Input.Naira,
      Input.UsdC,
      Input.UsdT,
    ];
    const final = initial.filter((el) => el === true);
    setDisabledBtn(true);
    if (ref1.current.checked) {
      value1 = ref1.current.value;
      iconName1 = ref1.current.nextSibling.textContent;
      if (!ref1.current.disabled) {
        updatePaymentMethod(iconName1, value1);
        console.log("input 1 made a request");
        ref1.current.disabled = true;
      } else {
        console.log("no Request made by input 1");
      }
    }
    if (ref2.current.checked) {
      value2 = ref2.current.value;
      iconName2 = ref2.current.nextSibling.textContent;
      console.log(iconName2, value2);
      if (!ref2.current.disabled) {
        updatePaymentMethod(value2, iconName2);
        console.log("input 2 made a request");
        ref2.current.disabled = true;
      } else {
        console.log("No request made by input 2");
      }
    }
    if (ref3.current.checked) {
      value3 = ref3.current.value;
      iconName3 = ref3.current.nextSibling.textContent;
      if (!ref3.current.disabled) {
        updatePaymentMethod(iconName3, value3);
        console.log("input 3 made a request");
        ref3.current.disabled = true;
      } else {
        console.log("No request made by input 3");
      }
    }
    if (ref4.current.checked) {
      value4 = ref4.current.value;
      iconName4 = ref4.current.nextSibling.textContent;
      if (!ref4.current.disabled) {
        updatePaymentMethod(iconName4, value4);
        console.log("input 4 made a request");
        ref4.current.disabled = true;
      } else {
        console.log("No request made by input 4");
      }
    }
    if (ref5.current.checked) {
      value5 = ref5.current.value;
      iconName5 = ref5.current.nextSibling.textContent;
      if (!ref5.current.disabled) {
        updatePaymentMethod(iconName5, value5);
        console.log("input 5 made a request");
        ref5.current.disabled = true;
      } else {
        console.log("No request made by input 5");
      }
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    if (ref1.current.checked && Input.duration !== "") {
      if (!ref1.current.disabled) {
        ref1.current.checked = false;
        Input.UsdT = false;
      }
    }
    if (ref2.current.checked && Input.duration !== "") {
      if (!ref2.current.disabled) {
        ref2.current.checked = false;
        Input.UsdC = false;
      }
    }
    if (ref3.current.checked && Input.duration !== "") {
      if (!ref3.current.disabled) {
        ref3.current.checked = false;
        Input.Busd = false;
      }
    }
    if (ref4.current.checked && Input.duration !== "") {
      if (!ref4.current.disabled) {
        ref4.current.checked = false;
        Input.Naira = false;
      }
    }
    if (ref5.current.checked && Input.duration !== "") {
      if (!ref5.current.disabled) {
        ref5.current.checked = false;
        Input.Fiat = false;
      }
    }
  };

  const updatePaymentMethod = async (value1, value2) => {
    try {
      const req = await axios.post(
        baseUrl + update_payment_Method,
        {
          name: value1,
          icon: value2,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
          },
        }
      );
      console.log(req);
      if (req.status === 201) {
        success(req.statusText);
      }
    } catch (err) {
      notify(err.message);
    }
  };

  return (
    <>
      <div className="form-container flexy ">
        <form action="" className="form  col-md-12">
          <div className="flexy ">
            {" "}
            <div className="col-md-5">
              {" "}
              <p
                className="fw-bold mt-4"
                style={{ color: "black", marginBottom: "50px" }}
              >
                Update your payment setup
              </p>
              <div className="flex mt-4">
                <input
                  type="radio"
                  className="checkbox mx-2"
                  name="UsdT"
                  value="USD₮"
                  checked={Input.UsdT}
                  onChange={handleChange}
                  ref={ref1}
                />
                <label htmlFor="usd-tether" className="fw-bold" id="UsdT">
                  USDT
                </label>
              </div>
              <div className="flex mt-4">
                <input
                  type="radio"
                  className="checkbox mx-2"
                  name="UsdC"
                  value="USDC"
                  checked={Input.UsdC}
                  onChange={handleChange}
                  ref={ref2}
                />
                <label htmlFor="usd-tether" className="fw-bold" id="UsdC">
                  USDC
                </label>
              </div>
              <div className="flex mt-4">
                <input
                  type="radio"
                  className="checkbox mx-2"
                  name="Busd"
                  value="BUSD"
                  checked={Input.Busd}
                  onChange={handleChange}
                  ref={ref3}
                />
                <label htmlFor="usd-tether" className="fw-bold" id="Busd">
                  BUSD
                </label>
              </div>
              <div className="flex mt-4">
                <input
                  type="radio"
                  className="checkbox mx-2"
                  name="Naira"
                  value="₦"
                  checked={Input.Naira}
                  onChange={handleChange}
                  ref={ref4}
                />
                <label htmlFor="usd-tether" className="fw-bold" id="Naira">
                  NAIRA
                </label>
              </div>
              <div className="flex mt-4">
                <input
                  type="radio"
                  className="checkbox mx-2"
                  name="Fiat"
                  value="FIAT"
                  checked={Input.Fiat}
                  onChange={handleChange}
                  ref={ref5}
                />
                <label htmlFor="usd-tether" className="fw-bold" id="Fiat">
                  FIAT
                </label>
              </div>
            </div>
            <div className="col-md-6 paymentimg">
              <img className="" src={PaymentImg} alt="Scholar" width="100%" />
            </div>
          </div>
          <div className="select-options">
            <select name="duration" id="duration" onChange={handleChange}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="form-btn d-flex justify-content-center align-items-center">
            <div className="me-4">
              <Button
                style={{ backgroundColor: "#2962F2", color: "#fff" }}
                click={handleSubmit}
                disable={DisabledBtn}
              >
                Update
              </Button>
            </div>

            <div>
              <Button
                style={{ backgroundColor: "#FC0019", color: "#fff" }}
                disable={DisabledBtn}
                click={cancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
