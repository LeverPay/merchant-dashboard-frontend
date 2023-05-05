import React, { useRef, useState } from "react";
import data from "../../Components/contact-support/questions/answers";
import "./help&suppport.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Form from "./form";
import { useEffect } from "react";

export default function Help() {
  const [renderForm, setRenderForm] = useState(false);
  const [renderAnswer, setRenderAnswer] = useState(
    Array(data.length).fill(false)
  );
  const formContainer = useRef();

  const displayAnswer = (item) => {
    setRenderAnswer((prev) => prev.map((el, i) => (i === item ? !el : false)));
  };

  useEffect(() => {
    const closeForm = (e) => {
      if (renderForm) {
        if (!formContainer.current.contains(e.target)) {
          setRenderForm(false);
        }
      }
    };
    document.addEventListener("mousedown", closeForm);

    return () => document.removeEventListener("mousedown", closeForm);
  });

  return (
    <div className="container">
      {data.map((item, index) => {
        return (
          <div
            className="bottom-line d-flex justify-content-around"
            key={item.id}
          >
            <div className="faq_container flex-wrap d-flex flex-column mt-5">
              <h3>{item.question}</h3>
              {renderAnswer[index] && (
                <p className="fs-4 mt-4">{item.answer}</p>
              )}
            </div>
            <span
              className="d-flex justify-content-center mt-5 arrow"
              onClick={() => displayAnswer(index)}
            >
              {!renderAnswer[index] ? (
                <IoIosArrowDropleftCircle size="50px" />
              ) : (
                <IoIosArrowDropdownCircle size="50px" />
              )}
            </span>
          </div>
        );
      })}

      <div className="container d-flex justify-content-center align-items-center">
        <p
          className="mt-5 fw-bold fs-5 more"
          onClick={() => setRenderForm(true)}
        >
          Need more Help?
        </p>
      </div>

      {renderForm && (
        <div ref={formContainer}>
          <Form />
        </div>
      )}
    </div>
  );
}
