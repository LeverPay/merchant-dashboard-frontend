import React from "react";
import "./style.css";
import Button from "../General/Button component/Button";

export default function PaymentElement() {
  return (
    <section className="payment-method d-flex flex-column justify-content-center px-4">
      <p className="mt-2 fw-bold mx-4">Payment Setup</p>
      <div className="form-container mx-4">
        <form action="" className="d-flex flex-column py-4 px-4">
          <p className="fw-bold mt-4">Update your payment setup</p>
          <div className="flex mt-2">
            <input type="checkbox" className="mx-2" />
            <label htmlFor="usd-tether" className="fw-bold" id="usdT">
              USDT
            </label>
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="mx-2" />
            <label htmlFor="usd-tether" className="fw-bold" id="usdT">
              USDC
            </label>
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="mx-2" />
            <label htmlFor="usd-tether" className="fw-bold" id="usdT">
              BUSD
            </label>
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="mx-2" />
            <label htmlFor="usd-tether" className="fw-bold" id="usdT">
              NAIRA
            </label>
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="mx-2" />
            <label htmlFor="usd-tether" className="fw-bold" id="usdT">
              FIAT
            </label>
          </div>

          <div className="select-options">
            <select name="" id="">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="form-btn d-flex justify-content-center align-items-center">
            <div className="me-4">
              <Button style={{ backgroundColor: "#2962F2", color: "#fff" }}>
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
      </div>
    </section>
  );
}
