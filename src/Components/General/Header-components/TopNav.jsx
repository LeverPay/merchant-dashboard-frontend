import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./header.css";
import message from "../../Notification-messages/Data";
import { BsDot } from "react-icons/bs";
import GenerateInvoice from "../../new Invoice/GenerateInvoice";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "../Button component/Button";

export default function TopNav() {
  const [notification, setNotification] = useState(message);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [closenotification, setcloseNotification] = useState(false);
  console.log(notification);
  const notificationref = useRef(),
    btn = useRef();

  useEffect(() => {
    const showNotification = () => {
      setcloseNotification(!closenotification);
    };

    notificationref.current.addEventListener("click", showNotification);

    return () =>
      notificationref.current.removeEventListener("click", showNotification);
  }, [closenotification]);

  const click = () => {
    setGenerateInvoice(!generateInvoice);
  };

  const markRead = (item) => {
    const updateData = [...notification];
    updateData[item].read = true;
    setNotification(updateData);
  };

  return (
    <section className="d-flex flex-column justify-content-end align-items-end">
      <div className="d-flex justify-content-end align-items-center">
        <a ref={notificationref} className="notify me-3">
          <NotificationsIcon
            className="header-notification-icon"
            htmlColor={"grey"}
          />
        </a>
        <a href="">
          <img
            className="img-fluid rounded-circle"
            src={require("../../../Assets/Ellipse 2.png")}
            alt="Profile-Image"
            style={{ width: "32px" }}
          />
          <KeyboardArrowDownIcon htmlColor="black" />
        </a>
      </div>
      {closenotification && (
        <div className="messages p-2 mt-2 d-flex flex-column text-start">
          {notification.map((el, index) =>
            !el.read ? (
              <span className="d-flex">
                <span className="d-flex align-items-end">
                  <BsDot size="25px" color="red" />
                </span>
                <li
                  className="items fs-5 mt-2 fw-bold"
                  onClick={
                    el.message.includes("New") ? click : () => markRead(index)
                  }
                >
                  {el.message}
                </li>
              </span>
            ) : (
              <li className="items fs-5 mt-2" onClick={() => markRead(index)}>
                {el.message}
              </li>
            )
          )}
        </div>
      )}
      {/* <div className="fs-5 new-invoice mt-4">
        <button ref={btn} className="hovered-btn bg-primary rounded">
          Generate Invoice
          <span>
            <AiFillPlusCircle />
          </span>
        </button>
      </div> */}
      {generateInvoice && (
        <div>
          <GenerateInvoice />
        </div>
      )}
    </section>
  );
}
