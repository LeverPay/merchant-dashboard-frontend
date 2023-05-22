import React from "react";

export default function Button({ children, click, style, disable}) {
  return (
    <button
      className="btn d-flex justify-content-center align-items-center rounded-3 mx-1"
      style={style}
      onClick={click}
      disabled={disable}
    >
      {children}
    </button>
  );
}
