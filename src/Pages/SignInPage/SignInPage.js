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

  const handleOncange = (e) => {
    const { name, value } = e.target;
    setInputText((prev) => ({ ...prev, [name]: value }));
    console.log(inputText);
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
      const request = await axios.post(baseUrl + login, {
        email: inputText.email,
        password: inputText.password,
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
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response !== undefined) {
        notify(err.response.data.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  return (
    <center className="col-md-12 signin-div">
      <form className="col-md-3 formmy-container ">
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
              placeholder="E-mail"
              id="mail"
            />
          </div>
          <div>
            <label htmlFor="pass-code" className="signin-label">
              PASSWORD
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputText.password}
              onChange={handleOncange}
              placeholder="Password should be at least 10 characters"
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
          <button
            disabled={submitButtonDisabled}
            className="sign-in"
            onClick={validateForm}
            id="signin-button"
          >
            Sign In
          </button>
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
        {/* </form> */}
      </form>
    </center>
  );
}

export default SignInPage;
