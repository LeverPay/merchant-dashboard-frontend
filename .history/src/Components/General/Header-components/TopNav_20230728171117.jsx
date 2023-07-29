import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import "./header.css";
import message from "../../Notification-messages/Data";
import { BsDot } from "react-icons/bs";
import GenerateInvoice from "../../new Invoice/GenerateInvoice";
import { AiOutlineDown } from "react-icons/ai";
import Button from "../Button component/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationAdd } from "@mui/icons-material";
import NotificationContext from "../NotificationContext";
import ImageContext from "../ImageContext";
import { AiOutlineLogout } from "react-icons/ai";
import { baseUrl, logout } from "../../Endpoints/Endpoints";
import TokenContext from "../../User-Token/TokenContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function TopNav() {
  const { notification, deletNotifications, markRead } =
    useContext(NotificationContext);
  const { notify, success } = useContext(TokenContext);
  const { vectorImage } = useContext(ImageContext);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [closenotification, setcloseNotification] = useState(false);
  const [displayOrderedItems, setDisplayOrderedItems] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
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

    //Notification animation login
    const interval = setInterval(() => {
      if (notification.length > 0) {
        notification.map((el) => {
          if (!el.read) {
            const randomAngle = Math.floor(Math.random() * 50) - 10; // Generate a random number between -10 and 10
            setRotationAngle(randomAngle);
          }
        });
      }
    }, 1000);

    return () => {
      notificationref.current?.removeEventListener("click", showNotification);
      btn.current?.removeEventListener("click", showInvoiceField);
      clearInterval(interval);
    };
  }, [closenotification, displayOrderedItems]);

  const click = (item) => {
    setDisplayOrderedItems(!displayOrderedItems);
    markRead(item);
  };

  const unReadNotification = notification.map((el) => el.read);

  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const req = await axios.get(baseUrl + logout, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(req);
      if (req.status === 200) {
        console.log("loggedOut");
        window.localStorage.clear();
        window.sessionStorage.clear();
        if (!window.sessionStorage.getItem("Name")) {
          setTimeout(() => navigate("/"), 3000);
        }
      }
    } catch (err) {
      console.log(err);
      if (
        err.response?.status === 400 ||
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };
  const location = useLocation();
  let name = location.pathname;
  let firstchar = name.replace(/^./, "").slice(0, 1).toUpperCase();
  let pageName = firstchar.concat(name.replace(/^./, "").slice(1));
  let symbol = pageName.indexOf("-") + 1;
  const replace = pageName.charAt(symbol).toUpperCase();
  const arr = pageName.split("");
  arr.splice(symbol, 1, replace);
  const replaced = arr.join("");

  return (
    <>
      <div className="flexy action-bar">
        <div className="col-md-">
          <h3
            className={`fw-semibold fs-5 ${
              pageName === `Profile` ||
              pageName === `Transactions` ||
              pageName === `Security` ||
              (pageName === `Payment-method` && symbol !== -1)
                ? `text-left`
                : `text-center`
            }`}
          >
            {pageName === ""
              ? (pageName = "Overview")
              : pageName.includes("-")
              ? replaced.replace("-", " ")
              : pageName}
          </h3>{" "}
        </div>
        <section className="d-flex flex-column justify-content-end align-items-end ">
          <div className="d-flex justify-content-end align-items-center">
            <motion.a
              ref={notificationref}
              className="notify me-3"
              animate={{
                rotateZ: [0, rotationAngle, -rotationAngle, 0], // Animation values for rotation
              }}
              transition={{
                duration: 0.3,
                loop: Infinity,
              }}
            >
              {notification.length > 0 && unReadNotification.includes(false) ? (
                <span>
                  <NotificationAdd
                    className="header-notification-icon"
                    htmlColor={"grey"}
                  />
                </span>
              ) : (
                <NotificationsIcon
                  className="header-notification-icon"
                  htmlColor={"grey"}
                />
              )}
            </motion.a>
            <span>
              <img
                className="img-fluid rounded-circle mx-4"
                src={
                  !vectorImage
                    ? require("../../../Assets/edit.png")
                    : vectorImage
                }
                alt="Profile-Image"
                style={{ width: "32px" }}
              />
              {/* <KeyboardArrowDownIcon htmlColor="black" /> */}
            </span>

            <span className="mx-2 logout" onClick={logOut}>
              <AiOutlineLogout size="30px" color="#FC0019" />
              <span className="word">Logout</span>
            </span>
          </div>
          <AnimatePresence>
            {closenotification &&
              (notification.length > 0 ? (
                <motion.div
                  className="messages p-2 py-4 mt-2 d-flex flex-column text-start"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
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
                        className={`items fs-5 mt-2 ${
                          !el.read ? `fw-bold` : ``
                        }`}
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
          </AnimatePresence>
          {generateInvoice && (
            <div>
              <GenerateInvoice setGenerateInvoice={setGenerateInvoice} />
            </div>
          )}
        </section>
      </div>
    </>
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
