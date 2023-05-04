import React, { useEffect, useRef, useState } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Button from "../../Components/General/Button component/Button.jsx";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Form({ setDisplayForm, transactionId }) {
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    firstname: "User Firstname",
    lastname: "User Lastname",
    email: "User@Mail",
    message: "",
    transactId: transactionId,
  });
  const contactSupport = useRef();
  const textArea = useRef();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const notify = () => {
    toast.success("Message Sent", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: false
    });
  };

  const closebtnAction = () => {
    setDisplayForm(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (!contactSupport.current.contains(e.target)) {
        setDisplayForm(false);
      }
    };
    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.message === "") {
      setError(true);
      textArea.current.classList.add("border-color");
    } else {
      setError(false);
      textArea.current.classList.remove("border-color");
    }

    if (
      input.firstname !== "" &&
      input.lastname !== "" &&
      input.email !== "" &&
      input.message !== ""
    ) {
      console.log(input);
      setDisplayForm(false);
      notify();
    }
  };

  return (
    <>
      <div
        className="contact-support d-flex flex-lg-row flex-sm-column px-5 py-5 justify-content-between"
        ref={contactSupport}
      >
        <div className="input-field-background d-flex flex-column rounded align-items-center">
          <span className="close" onClick={closebtnAction}>
            <AiOutlineClose size="25px" color="#fff" />
          </span>
          <form className="container" onSubmit={handleSubmit}>
            <div className="mt-5 container">
              <div className="d-flex name-input container justify-content-between">
                <div className="d-flex flex-column container">
                  <label htmlFor="" className="fw-bold">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={input.firstname}
                    onChange={handleChange}
                    className="px-1 py-2 input-field"
                    readOnly={true}
                  />
                </div>

                <div className="d-flex flex-column container">
                  <label htmlFor="" className="fw-bold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={input.lastname}
                    onChange={handleChange}
                    className="px-1 py-2 input-field"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 container">
              <label htmlFor="" className="fw-bold">
                What's your phone number? (optional)
              </label>
              <PhoneInput
                international
                value={phone}
                onChange={(val) => setPhone(val)}
                className="px-1 py-2 input-field"
              />
            </div>

            <div className="mt-5 d-flex flex-column container">
              <label htmlFor="" className="fw-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                readOnly={true}
                className="px-1 py-2 input-field"
              />
            </div>

            <div className="mt-5 d-flex flex-column container">
              <label htmlFor="" className="fw-bold">
                How can we help?
              </label>
              <textarea
                className="px-1 py-2 input-field"
                name="message"
                value={input.message}
                onChange={handleChange}
                ref={textArea}
              ></textarea>
              {error && (
                <small className="important-msg">This field is required</small>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Button
                style={{
                  backgroundColor: "#0051FF",
                  width: "100%",
                  color: "#fff",
                  Padding: "2%",
                }}
              >
                Send your message
              </Button>
            </div>
          </form>
        </div>

        <div className="second-container d-flex flex-column align-items-center">
          <div className="mt-5">
            <h2>Contact Support</h2>
            <p>
              We're available around the clock. <br />
              Let us know how we can help
            </p>
          </div>

          <div className="mt-5">
            <h5>Need a quick answer?</h5>
            <p className="mt-4">Call/Chat us</p>
            <div className="d-flex">
              <img
                src={require("../../Assets/call.png")}
                width="25px"
                height="25px"
                alt=""
              />
              <p>+234 7068936389</p>
            </div>
            <div className="d-flex">
              <img
                src={require("../../Assets/whatsapp.png")}
                width="25px"
                height="25px"
                alt=""
              />
              <p>+234 7068936389</p>
            </div>
            <div className="d-flex">
              <img
                src={require("../../Assets/telegram.png")}
                width="25px"
                height="25px"
                alt=""
              />
              <p>+234 7068936389</p>
            </div>
          </div>

          <a href="" className="d-flex mt-5 white">
            {" "}
            <img
              src={require("../../Assets/next.png")}
              width="25px"
              height="25px"
              className="next"
              alt=""
            />
            <small className="mx-2">Search the Help Desk</small>
          </a>
        </div>
      </div>
    </>
  );
}
