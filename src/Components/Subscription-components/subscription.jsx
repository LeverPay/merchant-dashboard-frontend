import React, { useState, useEffect, useContext } from "react";
import Card from "../cards/subscription-cards/Card";
import all from "../../Assets/all.png";
import pending from "../../Assets/pending1.png";
import active from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import cancel from "../../Assets/material-symbols-cancel-outline.png";
import "./style.css";
import { TableHead, HeaderData, data } from "./card-data";
import ToggleSwitch from "../General/Toggle Component/ToggleSwitch";
import TokenContext from "../User-Token/TokenContext";

export default function Subscription_el() {
  const [tableHeader] = useState(TableHead);
  const [tableheader2] = useState(HeaderData);
  const [tableBody] = useState(data);

  // Initialize all subuscription
  const [allSubscriptions, setAllSubscriptions] = useState(null);

  // Initialize pending subscriptions
  const [pendingSubscriptions, setPendingSubscriptions] = useState(null);

  //Initialize active subscriptions
  const [activeSubscriptions, setActiveSubscriptions] = useState(null);

  //Initialize canceled subscriptions
  const [canceledSubscriptions, setCanceledSubscriptions] = useState(null);

  //Initialize failed subscriptions
  const [failedSubscriptions, setFailedSubscriptions] = useState(null);

  // Ttacks clcked header and set colors dynamically
  const [trackClicked, settrackClicked] = useState("ALL");
  const [filteredData, setFilteredData] = useState(tableBody);

  // Tracks active table header tab
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { notify, success } = useContext(TokenContext);

  //Determines if toggle switch is checked
  const initialCheckedState = filteredData.reduce((acc, el) => {
    acc[el.id] = el.status === "Active";
    return acc;
  }, {});

  //Toggle switch state
  const [checked, setChecked] = useState(initialCheckedState);

  //Update items status
  const handleSwitchChange = (itemID, isChecked) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [itemID]: isChecked,
    }));

    // Update the status for the item based on isChecked value
    const newData = filteredData.map((el) => {
      if (el.id === itemID) {
        el.status = isChecked ? "Active" : "Canceled";
      }
      return el;
    });

    // Update the filteredData state
    setFilteredData(newData);
  };

  //copy link to clipboard
  const copyLink = (index) => {
    const linkText = index.link;

    if (!navigator.clipboard) {
      notify("Clipboard Api not supported on this browser");
      return Promise.reject("Clipboard Api not Supported");
    } else {
      return navigator.clipboard
        .writeText(linkText)
        .then(() => success("Link copied to clipboard"))
        .catch((err) => notify("Failed to copy text:", err));
    }
  };

  // Tracks total value of each subscriptions status for cards
  const dummyDataMap = () => {
    const allData = tableBody.map((el) => el.status);
    // Update all subscriptions
    setAllSubscriptions(allData);
    const pendingData = allData.filter((el) => el === "Pending");
    //Update pending subscriptions
    setPendingSubscriptions(pendingData);

    const canceled = allData.filter((el) => el === "Canceled");
    //Update canceled subscription
    setCanceledSubscriptions(canceled);
    const active = allData.filter((el) => el === "Active");
    // Update active subscriptions
    setActiveSubscriptions(active);
    const failed = allData.filter((el) => el === "Failed");
    //Update failed subscriptions
    setFailedSubscriptions(failed);
  };

  //Filters items depending on status tab clicked
  const switchTab = (index) => {
    if (index === "ALL") {
      settrackClicked("ALL");
      setFilteredData(tableBody);
    } else {
      const filteredData = tableBody.filter(
        (el) => el.status.toLowerCase() === index.toLowerCase()
      );
      settrackClicked(index);
      setFilteredData(filteredData);
    }

    //Update active tabel header
    const indexInTableHead = tableHeader.indexOf(index);
    setActiveTabIndex(indexInTableHead);
    console.log(filteredData, trackClicked);
  };

  useEffect(() => {
    dummyDataMap();
  }, [tableBody, filteredData]);

  return (
    <div className="subscription-container d-flex flex-column px-2">
      <section className="input-section d-flex justify-content-end">
        <span className="input-container">
          <input
            type="search"
            name=""
            placeholder="Search"
            className="input px-5 py-2 rounded-4"
          />
          <img
            src={require("../../Assets/search-icon.png")}
            alt=""
            className="input-icon"
          />
        </span>
      </section>

      <section className="card-section justify-content-center mt-4">
        <Card
          icon={all}
          status="All"
          count={allSubscriptions?.length}
          color="#2962F2"
        />
        <Card
          icon={pending}
          status="Pending"
          count={pendingSubscriptions?.length}
          color="#F5A31D"
        />
        <Card
          icon={active}
          status="Active"
          count={activeSubscriptions?.length}
          color="#0C6904"
        />
        <Card
          icon={failed}
          status="Failed"
          count={failedSubscriptions?.length}
          color="#FD3003"
        />
        <Card
          icon={cancel}
          status="Canceled"
          count={canceledSubscriptions?.length}
          color="#FF0505"
        />
      </section>

      <section className="table-section d-flex flex-column justify-content-center mt-5">
        <table className="table1">
          <thead>
            <tr className="table-border1 d-flex justify-content-center">
              {tableHeader.map((el, i) => (
                <th
                  key={i}
                  className={`headers mx-4 fs-5 fw-light ${
                    el === "ALL"
                      ? "blue"
                      : el === "PENDING"
                      ? "orange"
                      : el === "CANCELED"
                      ? "black"
                      : el === "FAILED"
                      ? "red"
                      : el === "ACTIVE"
                      ? "green"
                      : ""
                  } ${activeTabIndex === i ? "active-tab" : ""}`}
                  onClick={() => switchTab(el)}
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <table className="table2 mt-5 px-5">
          <tbody>
            <tr>
              {tableheader2.map((el, i) => (
                <th key={i} className="text-center">
                  {el}
                </th>
              ))}
            </tr>
          </tbody>

          {filteredData.map((el, i) => (
            <tbody className="tbody">
              <tr key={i} className="">
                <>
                  <td className="text-center px-4 py-2">{el.date}</td>
                  <td className="text-center px-4 py-2">{el.userID}</td>
                  <td className="text-center px-4 py-2">{el.Duration}</td>
                  <td className="text-center px-4 py-2">{el.startDate}</td>
                  <td className="text-center px-4 py-2">{el.endDate}</td>
                  <td className="text-center px-4 py-2">{el.paid}</td>
                  <td className="text-center px-4 py-2">
                    <ToggleSwitch
                      color="#0EB500"
                      checked={checked[el.id]}
                      handleChange={(event) =>
                        handleSwitchChange(el.id, event.target.checked)
                      }
                    />{" "}
                  </td>
                  <td className="text-center d-flex px-4 py-2 table-link">
                    {el.link}
                  </td>
                </>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </div>
  );
}
