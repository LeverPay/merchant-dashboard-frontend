import React, { useState } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Button from "../../Components/General/Button component/Button.jsx";
import { AiOutlineClose } from "react-icons/ai";

export default function Form({ setDisplayForm }) {
  const [phone, setPhone] = useState("");
  const handleChange = () => {};

  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code].name,
  }));

  const close = (e) => {
    setDisplayForm(false);
  };

  return (
    <>
      <div className="contact-support d-flex flex-column rounded align-items-center">
        <span className="close" onClick={close}>
          <AiOutlineClose size="25px" />
        </span>
        <form className="container">
          <div className="mt-5 container">
            <div className="d-flex container justify-content-between">
              <div className="d-flex flex-column container">
                <label htmlFor="" className="fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  name=""
                  value=""
                  className="px-1 py-2 input-field"
                />
              </div>

              <div className="d-flex flex-column container">
                <label htmlFor="" className="fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  name=""
                  value=""
                  className="px-1 py-2 input-field"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 container">
            <label htmlFor="" className="fw-bold">
              What's your phone number? (optional)
            </label>
            <PhoneInput
              international
              value={phone}
              onChange={(val) => setPhone(val)}
              className="px-1 py-2 input-field"
            />
          </div>

          <div className="mt-5 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              Email
            </label>
            <input
              type="email"
              name=""
              value=""
              className="px-1 py-2 input-field"
            />
          </div>

          <div className="mt-5 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              How can we help?
            </label>
            <select className="px-1 py-2 input-field">
              <option value="issue1">Issue 1</option>
              <option value="issue2">Issue 2</option>
              <option value="issue3">Issue 3</option>
              <option value="issue4">Issue 4</option>
            </select>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-5">
            <Button
              style={{
                backgroundColor: "#0051FF",
                width: "100%",
                color: "#fff",
                Padding: "2%",
              }}
            >
              Send your message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
