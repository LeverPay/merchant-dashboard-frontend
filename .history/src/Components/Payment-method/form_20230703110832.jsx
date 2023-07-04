import React, { useRef, useState } from "react";
import Button from "../General/Button component/Button";
import PaymentImg from "../../Assets/payment-img.png";
export default function Form() {
  const [Input, setInput] = useState({
    UsdT: false,
    Busd: false,
    UsdC: false,
    Naira: false,
    Fiat: false,
    duration: "",
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
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

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
      ref1.current.disabled = true;
    }
    if (ref2.current.checked) {
      ref2.current.disabled = true;
    }
    if (ref3.current.checked) {
      ref3.current.disabled = true;
    }
    if (ref4.current.checked) {
      ref4.current.disabled = true;
    }
    if (ref5.current.checked) {
      ref5.current.disabled = true;
    }
    console.log(final);
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
    console.log(Input);
  };

  return (
    <>
      <div className="form-container flexy">
        <form action="" className="form d-flex flex-column py-4 px-4 col-md-6">
          <p className="fw-bold mt-4" style={{ color: "black" }}>
            Update your payment setup
          </p>
          <div className="flex mt-2">
            <input
              type="checkbox"
              className="checkbox mx-2"
              name="UsdT"
              checked={Input.UsdT}
              onChange={handleChange}
              ref={ref1}
            />
            <label htmlFor="usd-tether" className="fw-bold" id="UsdT">
              USDT
            </label>
          </div>
          <div className="flex mt-2">
            <input
              type="checkbox"
              className="checkbox mx-2"
              name="UsdC"
              checked={Input.UsdC}
              onChange={handleChange}
              ref={ref2}
            />
            <label htmlFor="usd-tether" className="fw-bold" id="UsdC">
              USDC
            </label>
          </div>
          <div className="flex mt-2">
            <input
              type="checkbox"
              className="checkbox mx-2"
              name="Busd"
              checked={Input.Busd}
              onChange={handleChange}
              ref={ref3}
            />
            <label htmlFor="usd-tether" className="fw-bold" id="Busd">
              BUSD
            </label>
          </div>
          <div className="flex mt-2">
            <input
              type="checkbox"
              className="checkbox mx-2"
              name="Naira"
              checked={Input.Naira}
              onChange={handleChange}
              ref={ref4}
            />
            <label htmlFor="usd-tether" className="fw-bold" id="Naira">
              NAIRA
            </label>
          </div>
          <div className="flex mt-2">
            <input
              type="checkbox"
              className="checkbox mx-2"
              name="Fiat"
              checked={Input.Fiat}
              onChange={handleChange}
              ref={ref5}
            />
            <label htmlFor="usd-tether" className="fw-bold" id="Fiat">
              FIAT
            </label>
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
        <div className="col-md-6">
          <img className="" src={PaymentImg} alt="Scholar" width="100%" />
        </div>
      </div>
    </>
  );
}
