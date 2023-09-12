import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../General/Button component/Button";
import { useState } from "react";
import Confiramtion from "./confiramtion";
import Success_msg1 from "./success_msg-1";

export default function Show_Details({ details, state }) {
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [renderSuccess, setRenderSuccess] = useState(false);
  const [renderCancel, setRenderCancel] = useState(false);
  // Tracks button being clicked on
  const [buttonClicked, setButtonClicked] = useState("");

  const message1 = `Your subscription for Netflix has been approved successfully. 
  Start date: ${details.startDate} 
  End date: ${details.endDate} 

You can now enjoy uninterrupted service!
Cheers.
`;

  const message2 = `Your subscription for Netflix has been canceled successfully. 
`;

  const closeContainer = () => {
    state(false);
  };

  const confirmSubscription = () => {
    setConfirm(true);
    setButtonClicked((prev) => (prev = "Approve button is clicked"));
  };

  const CancelSubscription = () => {
    setCancel(true);
    setButtonClicked((prev) => (prev = "Cancel button is clicked"));
  };

  const tableRows = Object.entries(details).map(([key, value], index) => (
    <tr key={index}>
      <td
        className={`${
          key === "id" ? "hidden" : key === "link" ? "hidden" : ""
        }`}
      >
        {key}:{" "}
      </td>
      <td
        className={`${
          key === "id" ? "hidden" : key === "link" ? "hidden" : ""
        }`}
      >
        {value}
      </td>
    </tr>
  ));

  return (
    <div className="popup position-relative">
      <div className="subscription-details-container py-4">
        <div className="top-section mb-3">
          <div className="show-details-logo">
            <img src={require("../../Assets/vector.png")} alt="logo" />
          </div>

          <div className="close-btn fs-2" onClick={closeContainer}>
            <AiFillCloseCircle color="red" size="30px" />
          </div>
        </div>

        <div className="header mb-3">
          <h1 className="text-center fs-4">Subscription Details</h1>
        </div>

        <div className="px-4 mb-3">
          <table>
            <tbody>{tableRows}</tbody>
          </table>
        </div>

        <div className="d-flex justify-content-around mb-4">
          <div>
            <Button
              style={{ backgroundColor: "#0051FF", color: "#ffffff" }}
              click={confirmSubscription}
            >
              Approve
            </Button>
          </div>

          <div>
            <Button
              style={{ backgroundColor: "#FC0019", color: "#ffffff" }}
              click={CancelSubscription}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="footer-section d-flex justify-content-around px-2">
          <div className="d-flex justify-content-center">
            <div className="mx-2">
              <img src={require("../../Assets/sec-padlock.png")} alt="lock" />
            </div>

            <div>
              <p>
                Secured by{" "}
                <span style={{ color: "#0051FF" }} className="fw-bolder">
                  Leverpay
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {confirm && (
        <Confiramtion
          confirmationText="Are you sure you want to approve subscription?"
          closeItem={setConfirm}
          details={details}
          buttonMessage={buttonClicked}
          successMessage={setRenderSuccess}
        />
      )}

      {cancel && (
        <Confiramtion
          confirmationText="Are you sure you want to cancel subscription?"
          closeItem={setCancel}
          details={details}
          buttonMessage={buttonClicked}
          cancelMessage={setRenderCancel}
        />
      )}

      {renderSuccess && (
        <Success_msg1
          messageBody={message1}
          success="Successful"
          closeParent={setConfirm}
          closeItem={setRenderSuccess}
          closegrandContainer={closeContainer}
        />
      )}
      {renderCancel && (
        <Success_msg1
          messageBody={message2}
          success="Cancel"
          closeParent={setCancel}
          closeItem={setRenderCancel}
          closegrandContainer={closeContainer}
        />
      )}
    </div>
  );
}
