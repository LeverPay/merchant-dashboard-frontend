import React, { useEffect, useRef, useState } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Button from "../../Components/General/Button component/Button.jsx";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function Form({ setDisplayForm, transactionId }) {
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    firstname: "User Firstname",
    email: "User Email",
    message: "",
    transactId: transactionId,
  });

  const textArea = useRef();

  const contactSupport = useRef();

  const notify = () => {
    toast.success("Message Sent", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const userCloseForm = () => {
    setDisplayForm(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (!contactSupport.current.contains(e.target)) {
        e.stopPropagation();
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

    if (input.firstname !== "" && input.email !== "" && input.message !== "") {
      console.log(input);
      setDisplayForm(false);
      notify();
    }
  };

  return (
    <>
      <div
        className="message-form d-flex flex-column px-5 py-5 color"
        ref={contactSupport}
      >
        <span className="close" onClick={userCloseForm}>
          <AiOutlineClose size="25px" />
        </span>
        <div className="message-form-content">
          <h1>Help!</h1>
          <p className="fst-italic">
            Should you have any issue, feel free to contact us, we will
            <br /> get to you as soon as we can
          </p>
          <form
            action=""
            className="form-field rounded-2"
            onSubmit={handleSubmit}
          >
            <div className="rounded-2 d-flex align-items-center px-2">
              <label htmlFor="">
                <img
                  src={require("../../Assets/User.png")}
                  width="20px"
                  height="20px"
                  alt=""
                />
              </label>
              <input
                type="text"
                placeholder="Name"
                name="firstname"
                value={input.firstname}
                onChange={handleChange}
                className="container mt-2 px-2 py-1 mx-4 input"
                readOnly={true}
              />
            </div>

            <div className="rounded-2 d-flex align-items-center px-2 mt-4">
              <label htmlFor="">
                <img
                  src={require("../../Assets/Envelope Dots.png")}
                  width="20px"
                  height="20px"
                  alt=""
                />
              </label>
              <input
                type="email"
                placeholder="E-Mail"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="container mt-2 px-2 py-1 mx-4 input"
                readOnly={true}
              />
            </div>

            <div className="rounded-2 mt-4">
              <textarea
                ref={textArea}
                name="message"
                id=""
                value={input.message}
                onChange={handleChange}
                placeholder="Message"
                className="mt-2 input px-2 py-1 container"
              ></textarea>
              {error && (
                <small className="important-msg">This field is required</small>
              )}
            </div>

            <div className="container d-flex justify-content-end mt-4">
              <Button
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FF0BE7 1.45%, #302574 155.22%)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  width: "121px",
                }}
              >
                Send
              </Button>
            </div>
          </form>

          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-around mt-3">
              <span className="mx-1 fst-italic">Call/Chat US</span>{" "}
              <a href="" className="mx-2 color" target="_blank">
                <img
                  src={require("../../Assets/call.png")}
                  alt=""
                  width="20px"
                  height="20px"
                />
                +234 7068936384
              </a>
              <a
                href="https://wa.link/m6j550"
                className="mx-2 color"
                target="_blank"
              >
                <img
                  src={require("../../Assets/whatsapp.png")}
                  alt=""
                  width="20px"
                  height="20px"
                />
                +234 7068933455
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
