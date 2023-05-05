import React from "react";
import Button from "../../Components/General/Button component/Button";

export default function Form() {
  return (
    <div className="message-form d-flex flex-column px-5 py-5 color">
      <div className="message-form-content">
        <h1>Help!</h1>
        <p className="fst-italic">
          Should you have any issue, feel free to contact us, we will
          <br /> get to you as soon as we can
        </p>
        <form action="" className="form-field rounded-2">
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
              className="container mt-2 px-2 py-1 mx-4 input"
            />
          </div>

          <div className="rounded-2 d-flex align-items-center px-2">
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
              className="container mt-2 px-2 py-1 mx-4 input"
            />
          </div>

          <div className="rounded-2 d-flex align-items-center px-2">
            <label htmlFor="">
              <img
                src={require("../../Assets/discuss-issue.png")}
                width="20px"
                height="20px"
                alt=""
              />
            </label>
            <select
              name=""
              id=""
              className="container mt-2 px-2 py-1 mx-4 input"
            >
              <option value="">Find Your Issue</option>
              <option value="issue 1">Issue 1</option>
              <option value="issue 2">Issue 2</option>
              <option value="issue 3">Issue 3</option>
            </select>
          </div>

          <div className="rounded-2">
            <textarea
              name=""
              id=""
              placeholder="Message"
              className="mt-2 input px-2 py-1 container"
            ></textarea>
          </div>

          <div className="container d-flex justify-content-end">
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
            <span className="mx-2">
              <img
                src={require("../../Assets/call.png")}
                alt=""
                width="20px"
                height="20px"
              />
              +234 7068936384
            </span>
            <span className="mx-2">
              <img
                src={require("../../Assets/whatsapp.png")}
                alt=""
                width="20px"
                height="20px"
              />
              +234 7068933455
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
