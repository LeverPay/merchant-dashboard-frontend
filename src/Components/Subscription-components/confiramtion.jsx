import React from "react";
import Button from "../General/Button component/Button";

export default function Confiramtion({ confirmationText, closeItem }) {
  const close = () => [closeItem(false)];

  return (
    <div className="confirmation py-5">
      <p className="text-center">{confirmationText}</p>

      <div className="d-flex justify-content-around">
        <div>
          <Button style={{ backgroundColor: "#0051FF", color: "#ffffff" }}>
            YES
          </Button>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "#FC0019", color: "#ffffff" }}
            click={close}
          >
            NO
          </Button>
        </div>
      </div>
    </div>
  );
}
