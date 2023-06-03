import { useState } from "react";
import "./sign-in-page.css";
import { Link } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";
import { Password } from "./Password";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
function SignInPage() {
  const [inputText, setInputText] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const maxLength = 9;
  function handleInputChange(event) {
    const inputValue = event.target.value;
    console.log(inputText);
    setInputText(inputValue);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // setPassword(password);
    console.log(password);
    if (password.length === maxLength) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
              value={inputText}
              onChange={handleInputChange}
              maxLength={maxLength}
            />

            <h6>PASSWORD</h6>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="password should be at least 10 characters"
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
            <Link to={"/dashboard"}>
              {" "}
              <button disabled={submitButtonDisabled} className="sign-in">
                Sign In
              </button>
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
