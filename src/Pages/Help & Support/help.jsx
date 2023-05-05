import React, { useState } from "react";
import data from "../../Components/contact-support/questions/answers";
import "./help&suppport.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function Help() {
  const questions = data.map((el) => el);
  const [renderAnswer, setRenderAnswer] = useState(
    Array(data.length).fill(false)
  );
  console.log(data, renderAnswer, questions);

  const displayAnswer = (item) => {
    setRenderAnswer((prev) => prev.map((el, i) => (i === item ? !el : false)));
  };

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
              {renderAnswer[index] && <p className="fs-2 mt-4">{item.answer}</p>}
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
    </div>
  );
}
