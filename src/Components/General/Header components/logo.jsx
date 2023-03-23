import React from "react";

export default function Logo() {
  return (
    <div className="header-image-container">
      <img
        className="img-fluid"
        src={require("../../../Assets/logo.png")}
        alt=""
      />
    </div>
  );
}
