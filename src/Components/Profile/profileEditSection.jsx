import React from "react";
import Button from "../General/Button component/Button";

export default function ProfileEditSection() {
  return (
    <>
      <div className="profile-img bg-success rounded-circle">
        <img
          className="rounded-circle"
          src={require("../../Assets/user's image.png")}
          alt=""
        />
      </div>

      <Button style={{ backgroundColor: "#2962f2", color: "#ffffff" }}>
        Change
        <img
          className="mx-2"
          src={require("../../Assets/Edit-btn.svg").default}
          alt=""
        />
      </Button>

      <Button style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}>
        Change
        <img
          className="mx-2"
          src={require("../../Assets/Delete-btn.svg").default}
          alt=""
        />
      </Button>
    </>
  );
}
