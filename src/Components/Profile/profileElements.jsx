import React from "react";
import "./style.css";
import Form from "./form";
// import ProfileEditSection from "./profileEditSection";

export default function ProfileElements() {
  return (
    <section className="profile-container d-flex flex-column">
      <section className="profile-contents-container container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="profile-contents mt-4 px-2">
          <h2 className="fs-2">Basic Information</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad vel
            facere sit
          </p>

          <section className="form-container mt-4">
            <Form />
          </section>
        </div>
      </section>
    </section>
  );
}
