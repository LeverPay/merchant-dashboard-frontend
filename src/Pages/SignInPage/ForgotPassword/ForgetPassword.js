import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgot-pasword.css";
import TokenContext from "../../../Components/User-Token/TokenContext";
import { useContext } from "react";
function ForgetPassword() {
  const [InputMail, setInputMail] = useState("");
  const { notify } = useContext(TokenContext);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (InputMail !== "" && emailRegex.test(InputMail)) {
      console.log(InputMail);
    } else {
      notify("Mail field is not a valid format!");
    }
  };

  return (
    <div className="forget-password-div col-md-12">
      <center>
        <h1>Forgot Password</h1>
        <div className="col-md-3 forget-password-form">
          <form onSubmit={handleSubmit}>
            <h6>Email address</h6>
            <input
              type="text"
              onChange={(e) => setInputMail(e.target.value)}
              value={InputMail}
              name="InputMail"
            />
            <button>Forgot Password</button>
          </form>
        </div>
        <Link to={"/"} className="fplink">
          Back to Login
        </Link>
      </center>
    </div>
  );
}

export default ForgetPassword;
