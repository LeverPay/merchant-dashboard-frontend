import React from "react";

export default function profile() {
  return (
    <div className="header-profile-container d-flex justify-content-around align-items-center">
      <div className="header-notification-container">
        <img src={require("../../../Assets/Vector.svg").default} alt="" />
      </div>

      <div className="header-profile-img">
        <img
          className=" rounded-circle"
          src={require("../../../Assets/Ellipse 2.png")}
          alt=""
        />
      </div>

      <div className="header-profile-dropdown">
        <img
          className="img-fluid rounded-circle"
          src={require("../../../Assets/account set.svg").default}
          alt=""
        />
      </div>
    </div>
  );
}
