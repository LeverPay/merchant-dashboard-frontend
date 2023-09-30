import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Success({ setCancel, setSuccess, setConfirm }) {
  const closeRenders = () => {
    setCancel(false);
    setSuccess(false);
    setConfirm(false)
  };
  return (
    <div
      className="position-absolute top-50 start-50 translate-middle d-flex flex-column 
    justify-content-center align-items-center px-4 py-2 success"
    >
      <div className="d-flex justify-content-end fw-bold container-fluid">
        <div className="s-close" onClick={closeRenders}>
          <AiOutlineCloseCircle size="40px" color="red" />
        </div>
      </div>
      <img src={require(`../../Assets/check.png`)} alt="Success" />
      <small className="fw-bold">Successful</small>
    </div>
  );
}
