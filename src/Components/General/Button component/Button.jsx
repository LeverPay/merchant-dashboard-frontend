import React from "react";

export default function Button({ children, click, style }) {
  return (
    <button
      className="btn d-flex justify-content-around align-items-center rounded-3 mx-1"
      style={style}
      onClick={click}
    >
      {children}
    </button>
  );
}
