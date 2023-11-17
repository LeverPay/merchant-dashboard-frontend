import React from "react";
import Developer from "../../Components/Developer/Developer";
import "../../Components/Developer/developer.css";

export default function Developer_Page() {
  return (
    <div
      className="dev-page-container px-5 py-5 d-flex flex-column 
    justify-content-center align-items-center"
    >
      <Developer />
    </div>
  );
}
