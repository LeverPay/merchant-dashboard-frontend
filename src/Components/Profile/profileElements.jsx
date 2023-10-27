import React from "react";
import "./style.css";
import Form from "./form";
import TokenContext from "../User-Token/TokenContext";
import { useContext, useEffect, useState } from "react";
// import ProfileEditSection from "./profileEditSection";

export default function ProfileElements() {
  const { userData } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [addKyc, setAddKyc] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.first_name);
    }
    [userData];
  });
  return (
    <section className="profile-container d-flex flex-column offset-md-1">
      <section className="profile-contents-container ">
        <div className="profile-contents mt-4 px-2">
          <h2 className="">Basic Information</h2>
          {!addKyc ? (
            <p>
              Welcome to your profile <span>{name}</span>
            </p>
          ) : (
            <p style={{ color: "#2962f2" }}>Add Kyc Documents</p>
          )}

          <section className="form-container mt-4 ">
            <Form setAddKyc={setAddKyc} addKyc={addKyc} />
          </section>
        </div>
      </section>
    </section>
  );
}
