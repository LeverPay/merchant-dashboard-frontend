import { useState } from "react";
import "./sign-in-page.css";
import { Link } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";
import { Password } from "./Password";

function SignInPage() {
  const [nameValue, setNameValue] = useState("");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    console.log(nameValue);
  };
  const maxLength = 6;
  function handleInputChange(event) {
    const inputValue = event.target.value;
    setInputText(inputValue);

    if (inputValue.length === maxLength) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }
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
            <input
              type="text"
              required
              value={nameValue}
              onChange={handleNameChange}
              maxLength={maxLength}
            />

            <Password />
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
