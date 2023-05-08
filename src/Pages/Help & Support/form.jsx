import React, { useState, useRef } from "react";
import Button from "../../Components/General/Button component/Button";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { Input } from "@mui/material";

export default function Form({ setRenderForm }) {
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    issue: "",
  });

  const errMsg1 = useRef(),
    errMsg2 = useRef(),
    errMsg3 = useRef(),
    selectField = useRef(),
    textArea = useRef();

  const closebtnAction = () => {
    setRenderForm(false);
  };

  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};

    //validate Firstname input field
    if (input.firstname === "") {
      err.firstname = true;
      errMsg1.current.classList.remove("hidden");
    } else {
      if (!errMsg1.current.classList.contains("hidden")) {
        errMsg1.current.classList.add("hidden");
        err.firstname = false;
      }
    }

    //Validate lastname input field
    if (input.lastname === "") {
      errMsg2.current.classList.remove("hidden");
      err.lastname = false;
    } else {
      if (!errMsg2.current.classList.contains("hidden")) {
        errMsg2.current.classList.add("hidden");
      }
    }

    //validate E-mail input field
    if (!input.email.match(mailRegex)) {
      err.email = true;
      errMsg3.current.classList.remove("hidden");
    } else {
      if (!errMsg3.current.classList.contains("hidden")) {
        errMsg3.current.classList.add("hidden");
        err.email = false;
      }
    }

    //Validate message & select fields
    if (input.message === "" || selectField === "") {
      textArea.current.classList.add("border-color");
      selectField.current.classList.add("border-color");
      err.msg = true;
    } else { //bug here
      err.msg = false;
      textArea.current.classList.remove("border-color");
      selectField.current.classList.remove("border-color");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();

    const oneSelected = input.message || input.issue;

    if (
      input.firstname !== "" &&
      input.lastname !== "" &&
      input.email !== "" &&
      oneSelected
    ) {
      console.log(input, input.issue);
    }
  };

  return (
    <div className="contact-support d-flex flex-lg-row flex-sm-column px-5 py-5 justify-content-between">
      <div className="input-field-background d-flex flex-column rounded align-items-center">
        <span className="close" onClick={closebtnAction}>
          <AiOutlineClose size="25px" color="#fff" />
        </span>
        <form className="container" onSubmit={handleSubmit}>
          <div className="mt-2 container">
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
                <small className="important-msg hidden" ref={errMsg1}>
                  This field is required
                </small>
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
                <small className="important-msg hidden" ref={errMsg2}>
                  This field is required
                </small>
              </div>
            </div>
          </div>

          <div className="mt-4 container">
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

          <div className="mt-4 d-flex flex-column container">
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
            <small className="important-msg hidden" ref={errMsg3}>
              This field is required (e.g: user@mail.com)
            </small>
          </div>

          <div className="mt-4 d-flex flex-column container">
            <label htmlFor="" className="fw-bold"></label>
            <select
              name="issue"
              id=""
              value={input.issue}
              onChange={handleChange}
              className="container mt-4 px-2 px-1 py-2 input-field"
              ref={selectField}
            >
              <option value="">Find Your Issue</option>
              <option value="issue 1">Issue 1</option>
              <option value="issue 2">Issue 2</option>
              <option value="issue 3">Issue 3</option>
            </select>
          </div>

          <div className="mt-4 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              How can we help?
            </label>
            <textarea
              className="px-1 py-2 input-field"
              name="message"
              value={input.message}
              onChange={handleChange}
              ref={textArea}
            ></textarea>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-2">
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
