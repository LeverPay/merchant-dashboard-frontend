import React from "react";
import Loading from "../loading animation/loading";

export default function Button({ children, click, style, disable, animate }) {
  return (
    <button
      className="btn d-flex justify-content-center align-items-center rounded-3 mx-1"
      style={style}
      onClick={click}
      disabled={disable}
    >
      {children}
      {animate && (
        <span className="mx-2">
          <Loading />
        </span>
      )}
    </button>
  );
}
