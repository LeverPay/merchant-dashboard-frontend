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
  const [allSubscriptions, setAllSubscriptions] = useState(null);
  const [pendingSubscriptions, setPendingSubscriptions] = useState(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState(null);
  const [canceledSubscriptions, setCanceledSubscriptions] = useState(null);
  const [failedSubscriptions, setFailedSubscriptions] = useState(null);
  const [trackClicked, settrackClicked] = useState("ALL");
  const [filteredData, setFilteredData] = useState(tableBody);
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
    setAllSubscriptions(allData);
    const pendingData = allData.filter((el) => el === "Pending");
    setPendingSubscriptions(pendingData);

    const canceled = allData.filter((el) => el === "Canceled");
    setCanceledSubscriptions(canceled);
    const active = allData.filter((el) => el === "Active");
    setActiveSubscriptions(active);
    const failed = allData.filter((el) => el === "Failed");
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
          color="blue"
        />
        <Card
          icon={pending}
          status="Pending"
          count={pendingSubscriptions?.length}
          color="orange"
        />
        <Card
          icon={active}
          status="Active"
          count={activeSubscriptions?.length}
          color="green"
        />
        <Card
          icon={failed}
          status="Failed"
          count={failedSubscriptions?.length}
          color="red"
        />
        <Card
          icon={cancel}
          status="Canceled"
          count={canceledSubscriptions?.length}
          color="red"
        />
      </section>

      <section className="table-section d-flex flex-column justify-content-center mt-5">
        <table className="table1">
          <tr className="table-border1 d-flex justify-content-center">
            {tableHeader.map((el, i) => (
              <th
                key="key"
                className={`headers mx-4 fs-4 fw-light ${
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
                }`}
                onClick={() => switchTab(el)}
              >
                {el}
              </th>
            ))}
          </tr>
        </table>

        <table className="table2 mt-5 px-5">
          <tr>
            {tableheader2.map((el) => (
              <th key="key" className="text-center">
                {el}
              </th>
            ))}
          </tr>

          {filteredData.map((el) => (
            <tr key={el.id} className="">
              <>
                <td className="text-center px-4 py-2">{el.date}</td>
                <td className="text-center px-4 py-2">{el.userID}</td>
                <td className="text-center px-4 py-2">{el.phone}</td>
                <td className="text-center px-4 py-2">{el.description}</td>
                <td className="text-center px-4 py-2">{el.planType}</td>
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
                <td className="text-center d-flex px-4 py-2">
                  {el.link}{" "}
                  <span className="mx-2" onClick={() => copyLink(el)}>
                    <img
                      src={require(`../../Assets/typcn-messages.png`)}
                      alt=""
                    />
                  </span>{" "}
                </td>
              </>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
}