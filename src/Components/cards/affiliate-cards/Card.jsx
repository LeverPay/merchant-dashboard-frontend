import React from "react";
import "./card.css";

export default function Card({ icon, status, count, color }) {
  return (
    <div
      className="cards rounded-4"
      style={{ backgroundColor: color, color: "white" }}
    >
      <div className="card-left-side">
        <img src={icon} alt="card-img"  />
      </div>

      <div className="card-right-side">
      <span className="card-text"  >{status}</span>
        <span className="card-text">{count}</span>
      </div>
    </div>
  );
}
