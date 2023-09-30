import React, { useState } from "react";
import "./forgot-pasword.css";
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
