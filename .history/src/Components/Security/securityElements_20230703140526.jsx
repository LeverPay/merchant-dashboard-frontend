import React from "react";
import "./style.css";
import ToggleSwitch from "../General/Toggle Component/ToggleSwitch";
import Form from "./form";

export default function SecurityElements() {
  return (
    <section className="security-container d-flex flex-column">
      <section className="security-contents-container mt-2 d-flex flex-column justify-content-center align-items-center">
        <div className="security-contents mt-4 px-5">
          <h4 className="fs-2 fw-normal">Two Factor Authentication</h4>
          <p>
            We'll ask you for a code to confirm it's you logging into your
            account.
          </p>

          <section className="security-email d-flex  mt-4">
            <div className="security-email-content-1 d-flex flex-column">
              <h4 className="">Via sms or Email</h4>
              <p>A code will be sent to you via Email or sms</p>
            </div>

            <ToggleSwitch />
          </section>

          <section className="d-flex flex-column mt-2">
            <h4 className="">Change Password</h4>
            <p className="fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Form />
          </section>
        </div>
      </section>
    </section>
  );
}
