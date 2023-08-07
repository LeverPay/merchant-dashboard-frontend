import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../General/Button component/Button";
import Img from "../../Assets/sec-padlock.png";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import TokenContext from "../User-Token/TokenContext";
import { useContext } from "react";

export default function Form() {
  const [showPasswod, setShowPassword] = useState(false);
  const { notify, success } = useContext(TokenContext);
  const [showCurrent, setShowCurrent] = useState(false);
  const iconRef = useRef(),
    iconRef1 = useRef(),
    currentPassword = useRef(),
    newPassword = useRef(),
    confirmPassword = useRef();

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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    notifyInput();
    // if (
    //   Input.currentPassword !== "" &&
    //   Input.newPassword !== "" &&
    //   passwordRegex.test(Input.newPassword) &&
    //   passwordRegex.test(Input.confirmPassword) &&
    //   Input.confirmPassword === Input.newPassword &&
    //   Input.newPassword !== Input.currentPassword
    // ) {
    //   console.log(Input.currentPassword, Input.newPassword);
    // } else if (Input.currentPassword === "") {
    // }

    if (Input.newPassword === Input.confirmPassword) {
      renderSuccess();
    }
  };

  const renderSuccess = () => {
    if (
      Input.newPassword !== "" &&
      Input.confirmPassword !== "" &&
      Input.newPassword === Input.confirmPassword &&
      passwordRegex.test(Input.newPassword) &&
      passwordRegex.test(Input.confirmPassword)
    ) {
      if (iconRef.current.classList.contains("hidden")) {
        iconRef.current.classList.remove("hidden");
      }

      if (iconRef1.current.classList.contains("hidden")) {
        iconRef1.current.classList.remove("hidden");
      }
    } else {
      if (!iconRef.current.classList.contains("hidden")) {
        iconRef.current.classList.add("hidden");
      }

      if (!iconRef1.current.classList.contains("hidden")) {
        iconRef1.current.classList.add("hidden");
      }
    }
  };

  const notifyInput = () => {
    if (Input.currentPassword === "") {
      if (!currentPassword.current.classList.contains("bordered")) {
        currentPassword.current.classList.add("bordered");
      }
    } else {
      if (currentPassword.current.classList.contains("bordered")) {
        currentPassword.current.classList.remove("bordered");
      }
    }

    if (!passwordRegex.test(Input.newPassword)) {
      notify(
        "Password must contain a special character and cannot be less than 10characters"
      );
    } else if (!passwordRegex.test(Input.confirmPassword)) {
      notify(
        "Password must contain a special character and cannot be less than 10characters"
      );
    } else if (Input.newPassword !== Input.confirmPassword) {
      notify("Confirm password and new password fields not the same");
    } else if (Input.newPassword === Input.currentPassword) {
      notify("New password cannot be same as current Password");
    } else {
      if (
        Input.currentPassword !== "" &&
        passwordRegex.test(Input.newPassword) ===
          passwordRegex.test(Input.confirmPassword)
      ) {
        success("Action Successful");
      }
    }
  };

  const toggleShow = () => {
    setShowPassword(!showPasswod);
  };

  const toggleCurrentShow = () => {
    setShowCurrent(!showCurrent);
  };

  const discardChanges = (e) => {
    e.preventDefault();

    setInput((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    console.log(Input);
  };

  return (
    <form action="" className="change-password-form">
      <div className="py-2 d-flex flex-column">
        <label htmlFor="current-password">Current password</label>

        <div className="flexy flexyM">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <img className="" src={Img} alt="Scholar" />
            <input
              className="rounded-1 text-input"
              type={!showCurrent ? "password" : "text"}
              name="currentPassword"
              value={Input.currentPassword}
              onChange={handleChange}
              ref={currentPassword}
            />

            <div className="input-icons d-flex align-items-center justify-content-center">
              <span
                className="input-eye-icon d-flex"
                onClick={toggleCurrentShow}
              >
                {!showCurrent ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="new-password">New password</label>

        <div className="flexy flexyM">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <img className="" src={Img} alt="Scholar" />
            <input
              className="rounded-1 text-input"
              type={!showPasswod ? "password" : "text"}
              name="newPassword"
              value={Input.newPassword}
              onChange={handleChange}
              onInput={() => renderSuccess()}
              ref={newPassword}
            />
            <div className="input-icons d-flex align-items-center justify-content-center">
              <span className="success-mark me-2 hidden" ref={iconRef}>
                <BsFillCheckCircleFill color="green" />
              </span>

              <span className="input-eye-icon" onClick={toggleShow}>
                {!showPasswod ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="confirm-new-password">Confirm password</label>

        <div className="flexy flexyM">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <img className="" src={Img} alt="Scholar" />
            <input
              className="rounded-1 text-input"
              type={!showPasswod ? "password" : "text"}
              name="confirmPassword"
              value={Input.confirmPassword}
              onChange={handleChange}
              onInput={() => renderSuccess()}
              ref={confirmPassword}
            />
            <div className="input-icons d-flex align-items-center justify-content-center">
              <span className="success-mark me-2 hidden" ref={iconRef1}>
                <BsFillCheckCircleFill color="green" />
              </span>

              <span className="input-eye-icon" onClick={toggleShow}>
                {!showPasswod ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>
            </div>
          </div>
        </div>
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
