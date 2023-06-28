import React from "react";
import "./forgot-pasword.css";
function ForgetPassword() {
  return (
    <div className="forget-password-div col-md-12">
      <center>
        <h1>Forgot Password</h1>
        <div className="col-md-3 forget-password-form">
          <form>
            <h6>Email address</h6>
            <input type="text" />
            <button>Submit</button>
          </form>
        </div>
      </center>
    </div>
  );
}

export default ForgetPassword;
