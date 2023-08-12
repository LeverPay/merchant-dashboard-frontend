import React from "react";
import "./style.css";

export default function Card({ icon, status, count, color }) {
  return (
    <div
      className="cards rounded-4 py-1 px-2 d-flex"
      style={{ backgroundColor: color, color: "white" }}
    >
      <div className="d-flex my-2">
        <img src={icon} alt="card-img" className="mx-2" />
        <p className="fs-5">{status}</p>
      </div>

      <div className="d-flex justify-content-end">
        <p>{count}</p>
      </div>
    </div>
  );
}
