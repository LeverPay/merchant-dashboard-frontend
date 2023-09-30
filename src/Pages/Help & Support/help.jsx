import React, { useContext, useRef, useState } from "react";
import data from "../../Components/contact-support/questions/answers";
import "./help&suppport.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Form from "./form";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenContext from "../../Components/User-Token/TokenContext";

export default function Help() {
  const [renderForm, setRenderForm] = useState(false);
  const { notify, success } = useContext(TokenContext);
  const [renderAnswer, setRenderAnswer] = useState(
    Array(data.length).fill(false)
  );
  const formContainer = useRef(),
    notificationContainer = useRef();

  const displayAnswer = (item) => {
    setRenderAnswer((prev) => prev.map((el, i) => (i === item ? !el : false)));
  };

  useEffect(() => {
    const closeForm = (e) => {
      e.stopPropagation();
      if (renderForm) {
        if (!formContainer.current.contains(e.target)) {
          setRenderForm(false);
        }
        // if (notificationContainer.current.contains(e.target)) {
        //   setRenderForm(true);
        // }
      }
    };
    document.addEventListener("mousedown", closeForm);

    return () => document.removeEventListener("mousedown", closeForm);
  });

  return (
    <div className="">
      {data.map((item, index) => {
        return (
          <div
            className="bottom-line d-flex justify-content-around cursor col-md-8 offset-md-2"
            onClick={() => displayAnswer(index)}
            key={item.id}
          >
            <div className="faq_container mt-5 col-md-10">
              <h3>{item.question}</h3>
              {renderAnswer[index] && (
                <p className="fs-4 mt-4">{item.answer}</p>
              )}
            </div>
            <span className="mt-5 arrow">
              {!renderAnswer[index] ? (
                <IoIosArrowDropleftCircle size="30px" />
              ) : (
                <IoIosArrowDropdownCircle size="30px" />
              )}
            </span>
          </div>
        );
      })}

      <div className="container d-flex justify-content-center align-items-center">
        {/* <div ref={notificationContainer}>
          <ToastContainer />
        </div> */}
        <p
          className="mt-5 fw-bold fs-5 more"
          onClick={() => setRenderForm(true)}
        >
          Need more Help?
        </p>
      </div>

      {renderForm && (
        <div ref={formContainer}>
          <Form
            setRenderForm={setRenderForm}
            notify={notify}
            success={success}
          />
        </div>
      )}
    </div>
  );
}
