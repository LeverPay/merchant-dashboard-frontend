import { useState } from "react";
import "./sign-in-page.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";
import { Password } from "./Password";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
function SignInPage() {
  const [inputText, setInputText] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
    if (password.length >= maxLength) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };
  const handleConfirmPassword = (e) => {
    setPassword(e.target.value);

    // setPassword(password);
    console.log(password);
    if (password.length >= maxLength) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function validateForm() {
    // Check if the Email matches the user

    if (inputText !== "merchanttesting@gmail.com") {
      alert("Invalid username!");
      return;
    }
    if (password !== "Merchant6694") {
      alert("Invalid password !");
      return;
    }
    let lg = document.getElementById("signin-button");
    lg.innerHTML = "Logging in...";
    setTimeout(() => {
      lg.innerHTML = "Sign in";
      navigate("/dashboard");
    }, 3000);
  }

  return (
    <div className="col-md-12">
      <div className="col-md-4 form-container offset-md-4">
        {/* <form> */}
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
          />
          <h6>PASSWORD</h6>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password should be at least 10 characters"
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
          </span>{" "}
          <h6>CONFIRM PASSWORD</h6>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleConfirmPassword}
            placeholder="Password should be exact"
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
          {/* <Link to={"/dashboard"}> */}{" "}
          <button
            disabled={submitButtonDisabled}
            className="sign-in"
            onClick={() => {
              validateForm();
            }}
            id="signin-button"
          >
            Sign In
          </button>
          {/* </Link> */}
          {errorMessage && <div className="error"> {errorMessage} </div>}
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
        {/* </form> */}
      </div>
    </div>
  );
}

export default SignInPage;
