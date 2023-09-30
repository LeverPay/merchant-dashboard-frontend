import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./VerifyEmail.css";
import {
  baseUrl,
  resendVerification_Token,
  verify_Mail,
} from "../../Components/Endpoints";
import Button from "../../Components/General/Button component/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useLayoutEffect } from "react";

export default function Verify({ mail, renderSignUp }) {
  console.log(mail);
  let [email, setEmail] = useState("");

  //   useEffect(() => {
  //     if (mail === "") {
  //       mail = email
  //     }
  //   }, [email]);

  console.log(email);
  // Generates an array for for inputs
  const inputs = Array(4).fill(0);
  // adds useRefs to inputs
  const inputRefs = inputs.map(() => useRef());

  const [v_email, setV_email] = useState();

  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });

  const successNotify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      theme: "light",
    });

  const handleVerifyChange = (e, index) => {
    const { value } = e.target;

    //Tests if values is number
    if (/^\d*$/.test(value)) {
      if (value.length === 1) {
        if (index < inputs.length - 1) {
          // Focus on the next input if value is a number
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };

  const back_toSignup = () => {
    renderSignUp(false);
  };

  // Populate data automatically on all input fields
  const handlePaste = (e) => {
    e.preventDefault();
    // Get copied data
    const pastedData = e.clipboardData.getData("text/plain").trim();
    // Check if data is a number and length is == 4
    if (/^\d{4}$/.test(pastedData)) {
      inputs.forEach((_, i) => {
        inputRefs[i].current.value = pastedData[i];
        inputRefs[i].current.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      });
    }
  };

  const verifyMail = async (e) => {
    e.preventDefault();
    const _inputValues = inputRefs.map((el) => el.current.value);
    const value_As_String = _inputValues.toString().replace(/,/g, "");

    try {
      setAnimate(true);
      const request = await axios.post(baseUrl + verify_Mail, {
        email: mail === "" ? email : mail,
        token: value_As_String,
      });
      if (request.status === 200) {
        successNotify(request.data.message);
        setAnimate(false);
        setTimeout(() => {
          // Route to signin page
          navigate("/");
        }, 3000);
      } else {
        errorNotify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      setAnimate(false);
      errorNotify(err.response.data.message);
    }
  };

  const resend_Verification_Token = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(baseUrl + resendVerification_Token, {
        email: email,
      });
      console.log(request);
      if (request.status === 200) {
        successNotify(`New token has been sent to ${v_email}`);
      } else {
        errorNotify("Something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        errorNotify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          errorNotify(err.response.data.message);
        } else {
          errorNotify("Something went wrong :(");
        }
      }
    }
  };

  return (
    <form className="p-5 verify">
      <center>
        <p className="font-bold">{mail ? "Please Verify Your Account" : ""}</p>
        <div>
          {!mail && <h5>A code was sent to your mail, enter it</h5>}
          {mail && <h5>A code has beeen sent to {mail}</h5>}
        </div>
      </center>

      <>
        <div className="flex flex-column">
          {!mail && (
            <div>
              <label htmlFor="email" id="mail">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                id="mail"
                className="verify-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="d-flex">
          {inputs.map((_, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={inputRefs[index]}
                maxLength={1}
                className="mt-5 mx-2 verify-input fs-1 text-center"
                onChange={(e) => handleVerifyChange(e, index)}
                onPaste={handlePaste}
              />
            );
          })}
        </div>
        <div>
          <small className="fs-5 d-flex justify-content-center">
            Didn't get code?{" "}
            <Link onClick={resend_Verification_Token}>Click to resend</Link>
          </small>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <Button
            style={{
              backgroundColor: "#2962F2",
              width: "80%",
              color: "#fff",
              fontSize: "1.5rem",
            }}
            click={verifyMail}
            animate={animate}
          >
            Verify Account
          </Button>
        </div>
        <small className="fs-5 d-flex justify-content-center">
          Back to signup{" "}
          <Link className="mx-2" onClick={back_toSignup}>
            Go back
          </Link>
        </small>
      </>
    </form>
  );
}
