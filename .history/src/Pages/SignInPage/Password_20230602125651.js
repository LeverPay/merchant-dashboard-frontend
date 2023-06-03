import React, { useState } from "react";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
import "./password.css";
export const Password = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input form ">
      <h6>PASSWORD</h6>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        placeholder={props.placeholder}
        autocomplete="new-password"
      />

      <span onClick={toggleShowPassword}>
        {showPassword ? (
          <img className="" src={EyeClose} alt="Scholar" width="5%" />
        ) : (
          <img
            className=""
            src={EyeOpen}
            alt="Scholar"
            width="5%"
            height="5%"
          />
        )}
      </span>
    </div>
  );
};
