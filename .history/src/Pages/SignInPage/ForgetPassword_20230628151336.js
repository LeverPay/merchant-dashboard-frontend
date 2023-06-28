import React from "react";

function ForgetPassword() {
  return (
    <div className="forget-password-div col-md-12">
      <center>
        <div className="col-md-3 forget-password-form">
          <h1>FORGOT PASSWORD</h1>
          <form>
            <h6>Email address</h6>
            <input type="text" placeholder="email" />
            <button>Submit</button>
          </form>
        </div>
      </center>
    </div>
  );
}

export default ForgetPassword;
