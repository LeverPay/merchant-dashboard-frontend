import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgot-pasword.css";
import TokenContext from "../../../Components/User-Token/TokenContext";
import { useContext } from "react";
import { baseUrl, forgot_Password } from "../../../Components/Endpoints";
import axios from "axios";
function ForgetPassword() {
  const [InputMail, setInputMail] = useState("");
  const { notify, success } = useContext(TokenContext);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (InputMail !== "" && emailRegex.test(InputMail)) {
      sendTokenToMail();
    } else {
      notify("Mail field is not a valid format!");
    }
  };

  const sendTokenToMail = async () => {
    try {
      const req = await axios.post(baseUrl + forgot_Password, {
        email: InputMail,
      });
      console.log(req);
      if (req.status === 200) {
        success(`Token sent to ${InputMail}`);
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
