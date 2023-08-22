import React from "react";

export default function RemitanceFooter() {
  return (
    <div className="d-flex align-items-end mb-4">
      <span>
        <img src={require("../../Assets/pad-lock.png")} alt="secured" />
      </span>

      <small className="mx-2">
        Secured by{" "}
        <span className="fw-bolder" style={{ color: "#082E88" }}>
          Leverpay
        </span>
      </small>
    </div>
  );
}
