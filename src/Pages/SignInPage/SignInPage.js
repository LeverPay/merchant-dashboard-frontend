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
      setAnimate(true);
      const request = await axios.post(baseUrl + login, {
        email: inputText.email,
        password: inputText.password,
      });
      console.log(request);
      if (request.status === 200) {
        success("Successful");
        const uniqueId = request.data.data.token;
        const name = request.data.data.user;
        const stringify = JSON.stringify(name);
        const encryptedData = AES.encrypt(stringify, uniqueId).toString();
        const data = sessionStorage.setItem("dx", encryptedData);
        // setUserToken(uniqueId);
        // console.log(userToken);
        window.sessionStorage.setItem("Name", uniqueId);
        // localStorage.setItem('userData', JSON.stringify(user));
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
      console.log(err);
      setAnimate(false);
      if (err.response !== undefined) {
        notify(err.response.data.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  return (
    <div className="col-md-12 signin-div">
      <form className="col-md-4 formmy-container offset-md-4">
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
              placeholder=""
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
        {/* </form> */}
      </form>
    </div>
  );
}

export default SignInPage;
