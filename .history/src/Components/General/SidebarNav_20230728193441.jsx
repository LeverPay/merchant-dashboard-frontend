import React, { useRef, useState, useEffect, useContext } from "react";
import "./general.css";
import Logo from "./Header-components/Logo";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import MenuIcon from "../../Assets/menu2.png";
import CloseIcon from "../../Assets/close2.png";
import { AiOutlineLogout } from "react-icons/ai";
import { baseUrl, logout } from "../Endpoints/Endpoints";
import TokenContext from "../User-Token/TokenContext";
import axios from "axios";

export default function SidebarNav(props) {
  const { notify, success } = useContext(TokenContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const handleActive = (item) => {
    setActiveItem(item);
  };
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setSidebarOpen(!isMobile);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  function closeSidebar() {
    setSidebarOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        openSidebar();
      }
    }

    // Add event listener to listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call the function once to set the initial screen size
    handleResize();

    // Remove event listener when component unmounts
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItemsTop = [
    {
      icon: <DashboardRoundedIcon htmlColor="white" />,
      link: "./dashboard",
      title: "Dashboard",
    },
    // {icon: <SyncAltRoundedIcon htmlColor="white"/>, link: 'payment_method', title: 'Overview'},
    {
      icon: <SyncAltRoundedIcon htmlColor="white" />,
      link: "transactions",
      title: "Transaction",
    },
    {
      icon: <CreditCardRoundedIcon htmlColor="white" />,
      link: "payment-method",
      title: "Payment Method",
    },
    {
      icon: <BusinessCenterRoundedIcon htmlColor="white" />,
      link: "portfolio",
      title: "Portfolio",
    },
    {
      icon: <AccountCircleTwoToneIcon htmlColor="white" />,
      link: "profile",
      title: "Profile",
    },
    {
      icon: <SettingsRoundedIcon htmlColor="white" />,
      link: "security",
      title: "Setting",
    },
    // {
    //   icon: <AiOutlineLogout color="#FC0019" size="25px" />,
    //   title: "Logout",
    // },
  ];

  const sidebarItemsBottom = [
    {
      iconStart: <FileCopyOutlinedIcon htmlColor="white" />,
      link: "./",
      title: "Documentation",
      iconEnd: <OpenInNewOutlinedIcon htmlColor="white" />,
    },
    {
      iconStart: <QuizOutlinedIcon htmlColor="white" />,
      link: "Help",
      title: "Help & Support",
      iconEnd: <OpenInNewOutlinedIcon htmlColor="white" />,
    },
  ];

  //Active Nav functionality
  const [active, setActive] = useState(false);
  const handleNavClick = (idx) => {
    setActive(idx);
  };

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

  return (
    <>
      <div className="open-close-icons flexy menu" style={{ display: "flex" }}>
        <div className="col-8">&nbsp;</div>
        <span
          className="mobile-controls open"
          onClick={openSidebar}
          style={{ color: "black", fontSize: "20px" }}
        >
          <img className="img-fluid" src={MenuIcon} alt="" width="8%" />
        </span>
      </div>
      <aside
        className="sidebar-nav text-white slide-right "
        // style={{ width: "20%" }}
        id="mySidebar"
        style={{ display: sidebarOpen ? "block" : "none" }}
      >
        <section
          className="border-bottom"
          style={{ height: props.fixedTopHeight }}
        >
          <div
            className="d-flex align-items-center bg-light px-3 logo-container"
            style={{ height: "80%", borderTopRightRadius: "20px" }}
          >
            <Logo />
            <span
              onClick={closeSidebar}
              className="mobile-controls "
              style={{ color: "black", marginLeft: "15px" }}
            >
              <img className="img-fluid" src={CloseIcon} alt="" width="60%" />
            </span>
          </div>
        </section>
        <section
          className="d-flex flex-column justify-content-between contents"
          style={{ height: `calc(100% - ${props.fixedTopHeight}px)` }}
        >
          <div className="d-flex flex-column sidebar-links-top">
            <div className="mapped-items">
              {sidebarItemsTop.map((item, idx) => {
                return (
                  <NavLink
                    to={item.link}
                    key={idx}
                    className={`d-flex align-items-center${
                      active ? `active` : ``
                    }`}
                    onClick={() => handleNavClick(idx)}
                  >
                    <span className="link-icon">{item.icon}</span>
                    <span onClick={closeMobileMenu}>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
            <NavLink
              className="d-flex align-items-center logout-btn mb-4"
              onClick={logOut}
            >
              <span className="link-icon">
                <AiOutlineLogout color="white" size="20px" />
              </span>
              Logout
            </NavLink>
          </div>
          <div className="d-flex flex-column sidebar-links-bottom">
            {sidebarItemsBottom.map((item, idx) => {
              return (
                <a
                  key={idx}
                  href={item.link}
                  className="d-flex align-items-center link-light"
                >
                  <span className="link-icon">{item.iconStart}</span>
                  <div className="d-flex flex-fill justify-content-between align-items-center">
                    <span>{item.title}</span>
                    <span className="link-icon">{item.iconEnd}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </aside>
    </>
  );
}
