import { useState, useContext } from "react";
import "./sign-in-page.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/General/Header-components/Logo";
import { Password } from "./Password";
import EyeClose from "../../Assets/eye-close.jpg";
import EyeOpen from "../../Assets/eye-open.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, baseUrl } from "../../Components/Endpoints";
import axios from "axios";
import TokenContext from "../../Components/User-Token/TokenContext";

function SignInPage() {
  const [inputText, setInputText] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(TokenContext);

  const maxLength = 9;
  function handleInputChange(event) {
    const inputValue = event.target.value;
    console.log(inputText);
    setInputText(inputValue);
  }

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // setPassword(password);
    console.log(password);
    if (passwordRegex.test(password)) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };
  // const handleConfirmPassword = (e) => {
  //   setConfirmPassword(e.target.value);

  //   // setPassword(password);
  //   console.log(confirmPassword);
  //   if (confirmPassword === password) {
  //     setSubmitButtonDisabled(true);
  //   } else {
  //     setSubmitButtonDisabled(false);
  //   }
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function validateForm() {
    // Check if the Email matches the user

    if (!emailRegex.test(inputText)) {
      notify("Invalid mail format");
      return;
    }
    if (!passwordRegex.test(password)) {
      notify("Invalid password format");
      return;
    }

    if (emailRegex.test(inputText) && passwordRegex.test(password)) {
      handleLogin();
    }
  }

  const handleLogin = async () => {
    try {
      const request = await axios.post(baseUrl + login, {
        email: inputText,
        password: password,
      });
      console.log(request);
      if (request.status === 200) {
        success("Successful");
        const uniqueId = request.data.data.token;
        const name = request.data.data.user.first_name;
        setUserToken(uniqueId);
        // console.log(userToken);
        window.sessionStorage.setItem("Name", uniqueId);
        const cookie = window.sessionStorage.getItem("Name");
        if (cookie) {
          let lg = document.getElementById("signin-button");
          lg.innerHTML = "Logging in...";
          setTimeout(() => {
            lg.innerHTML = "Sign in";
            navigate("/dashboard");
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
      notify(err.response.data.message);
    }
  };

  return (
    <div className="col-md-12">
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
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
          <h6>Email</h6>
          <input
            type="email"
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
          {/* <h6>CONFIRM PASSWORD</h6>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
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
          </span> */}
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
