import React, { useState } from "react";
import Button from "../General/Button component/Button";

export default function Form() {
  const [Input, setInput] = useState({
    UsdT: false,
    Busd: false,
    UsdC: false,
    Naira: false,
    Fiat: false,
    duration: "",
  });

  const handleChange = (e) => {
    const { type, checked, value, name } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Input);
  };

  return (
    <form action="" className="form d-flex flex-column py-4 px-4">
      <p className="fw-bold mt-4">Update your payment setup</p>
      <div className="flex mt-2">
        <input
          type="checkbox"
          className="mx-2"
          name="UsdT"
          checked={Input.UsdT}
          onChange={handleChange}
        />
        <label htmlFor="usd-tether" className="fw-bold" id="UsdT">
          USDT
        </label>
      </div>
      <div className="flex mt-2">
        <input
          type="checkbox"
          className="mx-2"
          name="UsdC"
          checked={Input.UsdC}
          onChange={handleChange}
        />
        <label htmlFor="usd-tether" className="fw-bold" id="UsdC">
          USDC
        </label>
      </div>
      <div className="flex mt-2">
        <input
          type="checkbox"
          className="mx-2"
          name="Busd"
          checked={Input.Busd}
          onChange={handleChange}
        />
        <label htmlFor="usd-tether" className="fw-bold" id="Busd">
          BUSD
        </label>
      </div>
      <div className="flex mt-2">
        <input
          type="checkbox"
          className="mx-2"
          name="Naira"
          checked={Input.Naira}
          onChange={handleChange}
        />
        <label htmlFor="usd-tether" className="fw-bold" id="Naira">
          NAIRA
        </label>
      </div>
      <div className="flex mt-2">
        <input
          type="checkbox"
          className="mx-2"
          name="Fiat"
          checked={Input.Fiat}
          onChange={handleChange}
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
          >
            Update
          </Button>
        </div>

        <div>
          <Button style={{ backgroundColor: "#FC0019", color: "#fff" }}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
