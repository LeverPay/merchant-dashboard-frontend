import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./header.css";
import message from "../../Notification-messages/Data";
import { BsDot } from "react-icons/bs";
import GenerateInvoice from "../../new Invoice/GenerateInvoice";
import { AiOutlineDown } from "react-icons/ai";
import Button from "../Button component/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TopNav() {
  const [notification, setNotification] = useState(message);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [closenotification, setcloseNotification] = useState(false);
  const [displayOrderedItems, setDisplayOrderedItems] = useState(false);
  const notificationref = useRef(),
    displayItems = useRef(),
    btn = useRef();

  console.log(notification.length);

  useEffect(() => {
    const showNotification = () => {
      setcloseNotification(!closenotification);
    };

    const showInvoiceField = () => {
      setGenerateInvoice(true);
    };
    btn.current?.addEventListener("click", showInvoiceField);

    notificationref.current?.addEventListener("click", showNotification);

    return () => {
      notificationref.current?.removeEventListener("click", showNotification);
      btn.current?.removeEventListener("click", showInvoiceField);
    };
  }, [closenotification, displayOrderedItems]);

  const click = (item) => {
    setDisplayOrderedItems(!displayOrderedItems);
    markRead(item);
  };

  const deletNotifications = () => {
    setNotification([]);
    setcloseNotification(false);
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
      {closenotification &&
        (notification.length > 0 ? (
          <motion.div
            className="messages p-2 py-4 mt-2 d-flex flex-column text-start"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {notification.map((el, index) => (
              <span className="d-flex px-4 py-2" key={el.id}>
                {!el.read && (
                  <span className="d-flex align-items-center">
                    <BsDot size="25px" color="red" />
                  </span>
                )}
                <span
                  className={`items fs-5 mt-2 ${!el.read ? `fw-bold` : ``}`}
                  onClick={
                    !el.message.includes("New")
                      ? () => markRead(index)
                      : () => click(index)
                  }
                >
                  {el.message.includes("New") ? (
                    <>
                      <span className="d-flex flex-column">
                        <span className="d-flex" ref={displayItems}>
                          {el.message}
                          <span className="mx-4">
                            <AiOutlineDown size="20px" color="#0051FF" />
                          </span>
                        </span>
                        {displayOrderedItems && (
                          <span className="d-flex flex-column">
                            {el.items.map((el) => {
                              return (
                                <span
                                  className="d-flex flex-column fs-6 fw-lighter mx-4 py-2"
                                  key={el.id}
                                >
                                  <li>Name:{el.name}</li>
                                  <li>Qty:{el.qty}</li>
                                  <li>Price:{el.price}</li>
                                  <li>Description:{el.description}</li>
                                  <span className="my-4" ref={btn}>
                                    <Button
                                      style={{
                                        color: "#fff",
                                        backgroundColor: "#0051FF",
                                      }}
                                    >
                                      Generate Invoice
                                    </Button>
                                  </span>
                                </span>
                              );
                            })}
                          </span>
                        )}
                      </span>
                    </>
                  ) : (
                    el.message
                  )}
                </span>
              </span>
            ))}

            <div className="mt-4 d-flex align-items-center justify-content-center">
              <Button
                style={{
                  width: "40%",
                  backgroundColor: "#FF0505",
                  color: "#fff",
                }}
                click={deletNotifications}
              >
                Clear All
                <span className="mx-4">
                  <FaRegTrashAlt size="15px" />
                </span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="messages p-2 py-4 mt-2 d-flex flex-column text-start"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            No message to display
          </motion.div>
        ))}
      {generateInvoice && (
        <div>
          <GenerateInvoice
            setGenerateInvoice={setGenerateInvoice}
            notification={notification}
            setNotification={setNotification}
            // itemIndex={}
          />
        </div>
      )}
    </section>
  );
}

// {el.message.includes("new")
//                     ? el.items.map((el) => {
//                         return (
//                           <span>
//                             {/* {(el.name, el.price, el.qty, el.description)} */}
//                           </span>
//                         );
//                       })
