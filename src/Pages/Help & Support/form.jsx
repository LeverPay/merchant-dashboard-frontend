import React, { useState, useRef } from "react";
import Button from "../../Components/General/Button component/Button";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";

export default function Form({ setRenderForm }) {
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    firstname: "User Firstname",
    lastname: "User Lastname",
    email: "User@Mail",
    message: "",
  });

  const closebtnAction = () => {
    setRenderForm(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-support d-flex flex-lg-row flex-sm-column px-5 py-5 justify-content-between">
      <div className="input-field-background d-flex flex-column rounded align-items-center">
        <span className="close" onClick={closebtnAction} >
          <AiOutlineClose size="25px" color="#fff" />
        </span>
        <form className="container">
          <div className="mt-5 container">
            <div className="d-flex name-input container justify-content-between">
              <div className="d-flex flex-column container">
                <label htmlFor="" className="fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={input.firstname}
                  onChange={handleChange}
                  className="px-1 py-2 input-field"
                />
              </div>

              <div className="d-flex flex-column container">
                <label htmlFor="" className="fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={input.lastname}
                  onChange={handleChange}
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
              name="email"
              value={input.email}
              onChange={handleChange}
              className="px-1 py-2 input-field"
            />
          </div>

          <div className="mt-5 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              How can we help?
            </label>
            <textarea
              className="px-1 py-2 input-field"
              name="message"
              value={input.message}
              onChange={handleChange}
            ></textarea>
            {error && (
              <small className="important-msg">This field is required</small>
            )}
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

      <div className="second-container d-flex flex-column align-items-center">
        <div className="mt-5">
          <h2>Contact Support</h2>
          <p>
            We're available around the clock. <br />
            Let us know how we can help
          </p>
        </div>

        <div className="mt-5">
          <h5>Need a quick answer?</h5>
          <p className="mt-4">Call/Chat us</p>
          <a href="" className="d-flex color">
            <img
              src={require("../../Assets/call.png")}
              width="25px"
              height="25px"
              alt=""
            />
            <p>+234 7068936389</p>
          </a>
          <a className="d-flex color">
            <img
              src={require("../../Assets/whatsapp.png")}
              width="25px"
              height="25px"
              alt=""
            />
            <p>+234 7068936389</p>
          </a>
          <a href="" className="d-flex color">
            <img
              src={require("../../Assets/telegram.png")}
              width="25px"
              height="25px"
              alt=""
            />
            +234 7068936389
          </a>
        </div>

        <a href="" className="d-flex mt-5 white">
          {" "}
          <img
            src={require("../../Assets/next.png")}
            width="25px"
            height="25px"
            className="next"
            alt=""
          />
          <small className="mx-2">Search the Help Desk</small>
        </a>
      </div>
    </div>
  );
}
