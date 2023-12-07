import { useState, useContext } from "react";
import "./sign-in-page.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, baseUrl } from "../../Components/Endpoints";
import axios from "axios";
import TokenContext from "../../Components/User-Token/TokenContext";
import Loading from "../../Components/General/loading animation/loading";
import { AES } from "crypto-js";
import Button from "../../Components/General/Button component/Button";

import UserIcon from "../../Assets/male user.svg"
import usernameIcon from "../../Assets/ph_user.svg"
import PasswordLock from "../../Assets/Vector 2.svg"
import PasswordEye from "../../Assets/eyes1.svg"
import LeverpayLogo from "../../Assets/iconWeb.svg"
import HelpIcon from "../../Assets/material-symbols_help.svg"
import SecuredIcon from "../../Assets/securedBy.svg"
import CryptoIcon from "../../Assets/cryptocurrency-color_chat.svg";
import BackgroundPosterIcon from "../../Assets/man working on tablet and sitting on floor.svg"

function SignInPage() {
  const [inputText, setInputText] = useState({
    email: "",
    password: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(TokenContext);
  const [animate, setAnimate] = useState(false);

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  const handlePasswordOnPaste = (e) => {
    e.preventDefault();
    // Access the clipboard data
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text");

    // Update inputText state with pasted text
    setInputText((prev) => ({ ...prev, password: pastedText }));

    // Check if criteria are met for enabling the submit button
    if (emailRegex.test(inputText.email) && passwordRegex.test(pastedText)) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const handleEmailOnPaste = (e) => {
    e.preventDefault();
    // Access the clipboard data
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text");

    // Update inputText state with pasted text
    setInputText((prev) => ({ ...prev, email: pastedText }));

    // Check if criteria are met for enabling the submit button
    if (emailRegex.test(inputText.email) && passwordRegex.test(pastedText)) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const handleOncange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setInputText((prev) => ({ ...prev, [name]: value }));
    if (
      emailRegex.test(inputText.email) &&
      passwordRegex.test(inputText.password)
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function validateForm(e) {
    console.log('...her');
    e.preventDefault();
    // Check if the Email matches the user

    if (!emailRegex.test(inputText.email)) {
      notify("Invalid mail format");
      return;
    }
    if (!passwordRegex.test(inputText.password)) {
      notify("Invalid password format");
      return;
    }

    if (
      emailRegex.test(inputText.email) &&
      passwordRegex.test(inputText.password)
    ) {
      handleLogin();
    }
  }

  const handleLogin = async () => {
    try {
      setAnimate(true);
      const request = await axios.post(baseUrl + login, {
        email: inputText.email,
        password: inputText.password,
      });
      if (request.status === 200) {
        success("Successful");
        const uniqueId = request.data.data.token;
        window.sessionStorage.setItem("Name", uniqueId);
        const cookie = window.sessionStorage.getItem("Name");
        if (cookie) {
          setAnimate(false);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setAnimate(false);
      if (err.response !== undefined) {
        notify(err.response.data.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  return (
    <div className="col-md-12 main-container">
      <span className="main-icon-web">
        <img src={LeverpayLogo} alt="" height={'20px'} />
      </span>

    <div className="signin-div">

      <div className="signin-right-side">
          <img src={BackgroundPosterIcon} alt="" className="signin-poster-icon" />
          <div className="signin-right-side-footer">
            <div className="footer-top">
              <span className="form-text-four">Hi! Mechant,</span>
              <span className="form-text-four">Stay <span className="form-text-five">  Connected  </span>with Leverpay</span>
            </div>
            <div className="footer-down">
              <img src={SecuredIcon} alt=""  height={'15px'}/>
            </div>
          </div>
      </div>
    <div className="signin-left-side">


          <div className="signin-main-card">
 

          

            <span className="login-form-title">
              LOGIN
            
            </span>
              <span className="form-text-three">login to your account</span>

            <div className="login-form-input">

              <span className="login-form-label">Username</span>
              <span className="username-input">
                <img src={usernameIcon} alt=""  height={'20px'}/>
                <input type="email"  id="" className="userInput" placeholder="Username"   
                    name="email"
                    required
                    value={inputText.email}
                    onChange={handleOncange}
                    onPaste={handleEmailOnPaste}  />
              </span>
              <span className="login-form-label">Password</span>
              <span className="username-input">
                <img src={PasswordLock} alt="" height={'20px'}/>
                <input id="" className="userInput" type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputText.password}
                    onChange={handleOncange}
                    onPaste={handlePasswordOnPaste}
                    placeholder="***********"
                    autoComplete="new-password"  />
                      <span onClick={toggleShowPassword}>
                    {showPassword ? (
                      <img className="" src={EyeOpen} alt="Scholar" height={'20px'} />
                    ) : (
                      <img
                        className=""
                        src={ PasswordEye}
                        alt="Scholar"
                        height={'20px'}
                      />
                    )}
                  </span>
                {/* <img src={EyeOpen} alt="" /> */}
              </span>

              <div className="forgot-password-div">
                
                <Link   to={"/forget-password"} className="remember-text">Forgot Password</Link>
              </div>

              <button className="login-button"  
              
                  onClick={validateForm}
                  animate={animate}>
                LOGIN
              </button>
              {errorMessage && <div className="error"> {errorMessage} </div>}
              <p className="account-creation form-text-one"> 
                    stay  &nbsp; <span className="form-text-two">Connected</span>
                  </p>
       
            <div className="login-form-footer">
              <span className="form-text-one">© Leverpay</span>
              <div className="form-text-two">Privacy & Terms   &nbsp;&nbsp;&nbsp;<img src={CryptoIcon} alt="" height={'40px'} /> </div>
            </div>
          </div>
          </div>

          </div>

   
    </div>
   
 





      {/* <form className="col-md-4 formmy-container offset-md-4">
        <div className="col-md-12 form-heading">
          {" "}
          <center>
            <Logo />
          </center>
          <h4>Sign In</h4>
        </div>
        <div className="col-md-12 sign-form-body">
          <div>
            <label htmlFor="mail" className="signin-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={inputText.email}
              onChange={handleOncange}
              onPaste={handleEmailOnPaste}
              placeholder="E-mail"
              id="mail"
            />
          </div>
          <div>
            <label htmlFor="pass-code" className="signin-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputText.password}
              onChange={handleOncange}
              onPaste={handlePasswordOnPaste}
              placeholder="***********"
              autoComplete="new-password"
              id="pass-code"
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
          </div>
          <Button
            style={{
              backgroundColor: `${
                submitButtonDisabled ? "#abbce7" : "#0051FF"
              }`,
              color: `${submitButtonDisabled ? "#000" : "#fff"}`,
            }}
            disable={submitButtonDisabled}
            click={validateForm}
            animate={animate}
          >
            Sign In
          </Button>
          {errorMessage && <div className="error"> {errorMessage} </div>}
          <Link
            to={"/forget-password"}
            className="form-links"
            style={{ marginTop: "15px" }}
          >
            Forgot Password?
          </Link>
          <center>
            <p>
              Don’t have an Account?{" "}
              <Link to={"/welcome"} className="form-links">
                Sign Up
              </Link>
            </p>
          </center>
        </div>
    
      </form> */}
    </div>
  );
}

export default SignInPage;
