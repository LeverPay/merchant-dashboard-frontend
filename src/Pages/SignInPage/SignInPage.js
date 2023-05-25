import React from "react";
import "./sign-in-page.css";
import { Link } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";

function SignInPage() {
  return (
    <div className="col-md-12">
      <div className="col-md-4 form-container offset-md-4">
        <form>
          <div className="col-md-12 form-heading">
            {" "}
            <center>
              <Logo />
            </center>
            <h4>Sign In</h4>
          </div>
          <div className="col-md-12 sign-form-body">
            <h6>USERNAME</h6>
            <input type="text" />
            <h6>PASSWORD</h6>
            <input type="text" />
            <Link to={"/dashboard"}>
              {" "}
              <button>Sign In</button>
            </Link>
            <Link to={"/create-password"} className="form-links">
              Forget Password?
            </Link>
            <center>
              <p>
                Don’t have an Account?{" "}
                <Link to={"/welcome"} className="form-links">
                  <span>Sign Up</span>
                </Link>
              </p>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
