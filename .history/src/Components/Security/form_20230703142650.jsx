import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../General/Button component/Button";
import Img from "../../Assets/sec-padlock.png";

export default function Form() {
  const [Input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Input.currentPassword !== "" &&
      Input.newPassword !== "" &&
      Input.newPassword.length >= 5 &&
      Input.confirmPassword === Input.newPassword &&
      Input.newPassword !== Input.currentPassword
    ) {
      console.log(Input.currentPassword, Input.newPassword);
    }
  };

  const discardChanges = (e) => {
    e.preventDefault();

    Input.currentPassword = "";
    Input.newPassword = "";
    Input.confirmPassword = "";
  };

  return (
    <form action="" className="change-password-form">
      <div className="py-2 d-flex flex-column">
        <label htmlFor="current-password">Current password</label>

        <div className="flexy flexyM">
          <img className="" src={Img} alt="Scholar" />
          <input
            className="rounded-1 text-input"
            type="password"
            name="currentPassword"
            value={Input.currentPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="new-password">New password</label>

        <div className="flexy flexyM">
          <img className="" src={Img} alt="Scholar" />
          <input
            className="rounded-1 text-input"
            type="password"
            name="newPassword"
            value={Input.newPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="confirm-new-password">Confirm password</label>

        <div className="flexy flexyM">
          <img className="" src={Img} alt="Scholar" />
          <input
            className="rounded-1 text-input"
            type="password"
            name="confirmPassword"
            value={Input.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Link to={"forget-password"}>Forgot Password ?</Link>
      </div>

      <div className="d-flex mt-5 justify-content-center align-items-center">
        <Button
          style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}
          click={discardChanges}
        >
          Discard Changes
        </Button>

        <Button
          style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
          click={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
