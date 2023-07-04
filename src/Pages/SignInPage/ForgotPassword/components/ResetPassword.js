import React, { useState, useContext } from "react";
import TokenContext from "../../../../Components/User-Token/TokenContext";
import { Reset_password, baseUrl } from "../../../../Components/Endpoints";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { notify, success } = useContext(TokenContext);
  const [Input, setInput] = useState({
    token: "",
    newpassword: "",
    repeatPassword: "",
  });
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setInput((prev) => ({
      ...prev,
      [name]: name === "token" ? numericValue : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Input.token !== "" &&
      Input.newpassword !== "" &&
      Input.repeatPassword === Input.newpassword
    ) {
      if (
        passwordRegex.test(Input.newpassword) &&
        passwordRegex.test(Input.repeatPassword)
      ) {
        resetPassword();
      } else {
        notify(
          "Invalid Format: password field must be 10characters long and must include a special character and number"
        );
      }
    } else {
      notify("Invalid or Incomplete fields");
    }
  };

  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      const req = await axios.post(baseUrl + Reset_password, {
        token: Input.token,
        new_password: Input.newpassword,
      });
      console.log(req);
      if (req.status === 200) {
        success(`Action Successful ✔`);
        setTimeout(() => navigate("/"), 3000);
      } else {
        notify("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  return (
    <center>
      <h1>Reset Password</h1>
      <div className="col-md-3 forget-password-form">
        <form onSubmit={handleSubmit}>
          <h6>Token</h6>
          <input
            type="text"
            onChange={handleChange}
            value={Input.token}
            name="token"
          />
          <h6>New Password</h6>
          <input
            type="password"
            onChange={handleChange}
            value={Input.newpassword}
            name="newpassword"
          />
          <h6>Confirm Password</h6>
          <input
            type="password"
            onChange={handleChange}
            value={Input.repeatPassword}
            name="repeatPassword"
          />
          <button>Reset Password</button>
        </form>
      </div>
    </center>
  );
}
