import React, { useState, useRef } from "react";
import Button from "../../Components/General/Button component/Button";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import { AiOutlineCamera } from "react-icons/ai";

export default function Form({ setRenderForm, notify, success }) {
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [wordsLeft, setWordsLeft] = useState(200);
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    issue: "",
  });

  const errMsg1 = useRef(),
    errMsg2 = useRef(),
    errMsg3 = useRef(),
    selectField = useRef(),
    textArea = useRef(),
    lastName = useRef(),
    firstName = useRef(),
    mail = useRef(),
    errMsg6 = useRef();

  const closebtnAction = () => {
    setRenderForm(false);
  };

  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    const wordCount = input.message.trim().split(/\s+/).length;
    const newWordsLeft = 200 - wordCount;
    setWordsLeft(newWordsLeft);
  };

  //Removes error while user changes input
  const toggleErr1 = () => {
    if (input.firstname !== "") {
      if (!errMsg1.current.classList.contains("hidden")) {
        errMsg1.current.classList.add("hidden");
      }
    } else {
      if (input.firstname === "") errMsg1.current.classList.remove("hidden");
    }
  };

  //Removes error while user changes input
  const togggleErr2 = () => {
    if (input.lastname !== "") {
      if (!errMsg2.current.classList.contains("hidden")) {
        errMsg2.current.classList.add("hidden");
      }
    } else {
      if (input.lastname === "") errMsg2.current.classList.remove("hidden");
    }
  };

  //Removes error while user changes input
  const toggleErr3 = () => {
    if (input.email !== "") {
      if (!errMsg3.current.classList.contains("hidden")) {
        errMsg3.current.classList.add("hidden");
      }
    } else {
      if (input.email === "") errMsg3.current.classList.remove("hidden");
    }

    if (!input.email.match(mailRegex)) {
      if (errMsg3.current.classList.contains("hidden")) {
        errMsg3.current.classList.remove("hidden");
      }
    } else {
      errMsg3.current.classList.add("hidden");
    }
  };

  //Removes error while user changes input
  const toggleErr4 = () => {
    if (input.message !== "") {
      if (textArea.current.classList.contains("border-color")) {
        textArea.current.classList.remove("border-color");
        selectField.current.classList.remove("border-color");
      }
    } else {
      if (input.message === "") {
        textArea.current.classList.add("border-color");
        selectField.current.classList.add("border-color");
      }
    }
  };

  //Removes error while user changes input
  const toggleErr5 = () => {
    if (input.issue !== "") {
      if (selectField.current.classList.contains("border-color")) {
        textArea.current.classList.remove("border-color");
        selectField.current.classList.remove("border-color");
      }
    } else {
      if (input.issue === "") {
        if (!selectField.current.classList.contains("border-color")) {
          selectField.current.classList.add("border-color");
        }
      }
    }
  };

  const handlePhone = (val) => {
    setPhone(val);
    if (!val || !val.startsWith("+")) {
      errMsg6.current.classList.remove("hidden");
    } else {
      if (!errMsg6.current.classList.contains("hidden")) {
        errMsg6.current.classList.add("hidden");
      }
    }
  };

  const _image = (e) => {
    const img = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = () => {
      setFile(fileReader.result);
      setDescription(img.name);
      console.log(fileReader.result);
    };
  };

  const getImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/x-png,image/jpeg,/image/jpg";
    input.onchange = _image;
    input.click();
  };

  const validate = () => {
    //validate Firstname input field
    if (input.firstname === "") {
      errMsg1.current.classList.remove("hidden");
    } else {
      if (!errMsg1.current.classList.contains("hidden")) {
        errMsg1.current.classList.add("hidden");
      }
    }

    //Validate lastname input field
    if (input.lastname === "") {
      errMsg2.current.classList.remove("hidden");
    } else {
      if (!errMsg2.current.classList.contains("hidden")) {
        errMsg2.current.classList.add("hidden");
      }
    }

    //validate E-mail input field
    if (!input.email.match(mailRegex)) {
      errMsg3.current.classList.remove("hidden");
    } else {
      if (!errMsg3.current.classList.contains("hidden")) {
        errMsg3.current.classList.add("hidden");
      }
    }

    //Validate message & select fields
    if (input.message === "") {
      textArea.current.classList.add("border-color");

      if (input.issue !== "") {
        if (textArea.current.classList.contains("border-color")) {
          textArea.current.classList.remove("border-color");
        } else {
          textArea.current.classList.add("border-color");
        }
      }
    } else {
      if (input.message !== "") {
        textArea.current.classList.remove("border-color");
      }
    }

    if (input.issue === "") {
      selectField.current.classList.add("border-color");

      if (input.message !== "") {
        if (selectField.current.classList.contains("border-color")) {
          selectField.current.classList.remove("border-color");
        } else {
          selectField.current.classList.add("border-color");
        }
      }
    } else {
      //bug here
      if (input.issue !== "") {
        selectField.current.classList.remove("border-color");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();

    const oneSelected = input.message || input.issue;

    if (
      input.firstname !== "" &&
      input.lastname !== "" &&
      input.email !== "" &&
      oneSelected &&
      wordsLeft >= 1 &&
      wordsLeft <= 200 &&
      !wordsLeft <= 0
    ) {
      console.log(input, input.issue, phone, file);
      success("Message Sent");
    } else {
      notify("Please fill the message box or select your related problem");
    }
  };

  return (
    <div className="contact-support d-flex flex-lg-row flex-sm-column px-5 py-5 justify-content-between">
      <div className="input-field-background d-flex flex-column rounded align-items-center">
        <span className="close" onClick={closebtnAction}>
          <AiOutlineClose size="25px" color="#fff" />
        </span>
        <form className="container" onSubmit={handleSubmit}>
          <div className="mt-2 container">
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
                  ref={firstName}
                  onInput={toggleErr1}
                />
                <small className="important-msg hidden" ref={errMsg1}>
                  This field is required
                </small>
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
                  ref={lastName}
                  onInput={togggleErr2}
                />
                <small className="important-msg hidden" ref={errMsg2}>
                  This field is required
                </small>
              </div>
            </div>
          </div>

          <div className="mt-4 container">
            <label htmlFor="" className="fw-bold">
              What's your phone number? (optional)
            </label>
            <PhoneInput
              international
              name="phone"
              value={phone}
              onChange={handlePhone}
              className="px-1 py-2 input-field"
            />
            <small className="important-msg hidden" ref={errMsg6}>
              start with country code e.g (+234 8xxx12xx)
            </small>
          </div>

          <div className="mt-4 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="px-1 py-2 input-field"
              ref={mail}
              onInput={toggleErr3}
            />
            <small className="important-msg hidden" ref={errMsg3}>
              This field is required (e.g: user@mail.com)
            </small>
          </div>

          <div className="mt-4 d-flex flex-column container">
            <label htmlFor="" className="fw-bold"></label>
            <select
              name="issue"
              id=""
              value={input.issue}
              onChange={handleChange}
              className="container mt-4 px-2 px-1 py-2 input-field"
              ref={selectField}
              onInput={toggleErr5}
            >
              <option value="">Find Your Issue</option>
              <option value="issue 1">Issue 1</option>
              <option value="issue 2">Issue 2</option>
              <option value="issue 3">Issue 3</option>
            </select>
          </div>

          <div className="mt-4 d-flex flex-column container">
            <label htmlFor="" className="fw-bold">
              How can we help?
            </label>
            <textarea
              className="px-1 py-2 input-field"
              name="message"
              value={input.message}
              onChange={handleChange}
              ref={textArea}
              onInput={toggleErr4}
            ></textarea>
            {wordsLeft >= 1 && wordsLeft <= 200 ? (
              <p className="fs-6">{wordsLeft} words left</p>
            ) : (
              <p className="important-msg fs-6">Too many words</p>
            )}
            <div className="mt-1 fs-6">
              <span className="screenshot" onClick={getImage}>
                <AiOutlineCamera size="30px" color="black" />
              </span>
              <span className="mx-2">
                {!file
                  ? "Kindly send us a Screenshot to help understand your issue"
                  : description}
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-2">
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
          <br />
        </form>
      </div>

      <div className="second-container d-flex flex-column align-items-center mx-4 mt-4">
        <div className="">
          <h2 className="white">Contact Support</h2>
          <p className="white fs-6 mt-0">
            We're available around the clock. <br />
            Let us know how we can help
          </p>
        </div>

        <div className="mt-5">
          <h5>Need a quick answer?</h5>
          <p className="white fs-5">Call/Chat us</p>
          <a
            href=""
            className="d-flex justtify-content-center align-items-center color"
          >
            <img
              src={require("../../Assets/call.png")}
              width="25px"
              height="25px"
              alt=""
            />
            <p className="fs-6 mx-4 color">+234 7068936389</p>
          </a>

          <a
            href=""
            className="d-flex justtify-content-center align-items-center color"
          >
            <img
              src={require("../../Assets/whatsapp.png")}
              width="25px"
              height="25px"
              alt=""
            />
            <p className="fs-6 mx-4 color">+234 7068936389</p>
          </a>
          <a
            href=""
            className="d-flex justtify-content-center align-items-center color"
          >
            <img
              src={require("../../Assets/telegram.png")}
              width="25px"
              height="25px"
              alt=""
            />
            <p className="fs-6 mx-4 color">+234 7068936389</p>
          </a>
        </div>

        <a
          href=""
          className="d-flex justtify-content-center align-items-center mt-4 color"
        >
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
  );
}
