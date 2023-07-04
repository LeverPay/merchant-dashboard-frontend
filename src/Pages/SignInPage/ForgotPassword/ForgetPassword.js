import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgot-pasword.css";
import TokenContext from "../../../Components/User-Token/TokenContext";
import { useContext } from "react";
import { baseUrl, forgot_Password } from "../../../Components/Endpoints";
import axios from "axios";
import SendToken from "./components/SendNewPasswordToken";
import ResetPassword from "./components/ResetPassword";
function ForgetPassword() {
  const [renderReset, setRenderReset] = useState(false);

  return (
    <div className="forget-password-div col-md-12">
      {!renderReset ? (
        <SendToken setRenderReset={setRenderReset} />
      ) : (
        <ResetPassword />
      )}
    </div>
  );
}

export default ForgetPassword;
