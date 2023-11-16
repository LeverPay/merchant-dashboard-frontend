import React, { useContext, useState } from "react";
import "./affilate.css";
import logo from "../../Assets/vector.png";
import lock from "../../Assets/sec-padlock.png";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../General/Button component/Button";
import TokenContext from "../User-Token/TokenContext";
import { useNavigate } from "react-router-dom";

export default function Registeration() {
  const { notify, success } = useContext(TokenContext);
  const [affilateData, setAffilateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    splitPercent: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{9,13}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAffilateData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (affilateData.firstName === "") {
      notify("First name is empty");
      return;
    }

    if (affilateData.lastName === "") {
      notify("Last name is empty");
      return;
    }

    if (affilateData.email === "") {
      notify("Enter valid mail");
      return;
    } else if (!emailRegex.test(affilateData.email)) {
      notify("Email is not valid");
      return;
    }

    if (affilateData.phone === "") {
      notify("Enter phone number");
      return;
    } else if (!phoneRegex.test(affilateData.phone)) {
      notify("Phone number is invalid");
      return;
    }

    if (affilateData.splitPercent === "") {
      notify("Percent value is empty");
      return;
    }

    if (
      affilateData.firstName !== "" &&
      affilateData.lastName !== "" &&
      affilateData.email !== "" &&
      affilateData.phone !== "" &&
      affilateData.splitPercent !== "" &&
      emailRegex.test(affilateData.email) &&
      phoneRegex.test(affilateData.phone)
    ) {
      notify("Feature still in works :(");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();
  };

  const navigate = useNavigate();
  const discardAction = () => {
    navigate("/dashboard");
  };

  return (
    <div className="affilate-reg-container px-5 py-5 d-flex flex-column justify-content-center">
      <div className="registeration-content px-5 py-5 rounded">
        <div className="images-section d-flex justify-content-between mb-3">
          <div>
            <img src={logo} alt="leverpay-logo" />
          </div>
        </div>

        <div className="affilate-reg-header">
          <h1 className="fw-bolder text-center fs-5 mb-2">
            Affilate Registeration
          </h1>
          <p className="text-center">
            Please fill in your new affilate data below to generate a new
            affilate code
          </p>
        </div>

        <div className="affilate-reg-inputs-container d-flex flex-column justify-content-center px-5">
          <div className="inputs-container mt-2 mb-3">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={affilateData.firstName}
              id="first-name"
              className="input rounded mb-2"
              required
            />
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={affilateData.lastName}
              id="last-name"
              className="input rounded mb-2"
              required
            />
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="user-mail">Email</label>
            <input
              type="email"
              name="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              onChange={handleChange}
              value={affilateData.email}
              id="user-mail"
              className="input rounded mb-2"
              required
            />
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="phone-number">phone</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{9,13}"
              onChange={handleChange}
              value={affilateData.phone}
              id="phone-number"
              className="input rounded mb-2"
              required
            />
          </div>

          <div className="inputs-container mb-5">
            <label htmlFor="percent-split">Percentage-split</label>
            <input
              type="number"
              name="splitPercent"
              onChange={handleChange}
              value={affilateData.splitPercent}
              id="percent-split"
              className="input rounded mb-2"
              required
            />
          </div>
        </div>

        <div className="affilate-btn-container mb-3">
          <div className="d-flex justify-content-center mb-2">
            <Button
              click={handleSubmit}
              style={{
                backgroundColor: "#2962f2",
                color: "#fff",
                width: "50%",
                padding: "5px",
              }}
            >
              Save
            </Button>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              click={discardAction}
              style={{
                backgroundColor: "#fd3003",
                color: "#fff",
                width: "50%",
                padding: "5px",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="affilate-reg-footer d-flex justify-content-center align-items-center mt-2">
          <img src={lock} alt="secured" className="mx-2" />
          <p className="m-0">
            Secured by{" "}
            <span className="fw-bolder" style={{ color: "#2962f2" }}>
              Leverpay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
