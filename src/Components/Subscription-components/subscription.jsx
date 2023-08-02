import React, { useState } from "react";
import Card from "../cards/subscription-cards/Card";
import all from "../../Assets/all.png";
import pending from "../../Assets/pending1.png";
import active from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import cancel from "../../Assets/material-symbols-cancel-outline.png";
import "./style.css";
import { TableHead, HeaderData, data } from "./card-data";
import { useEffect } from "react";

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
  }, [tableBody]);

  return (
    <div className="subscription-container d-flex flex-column px-2">
      <section className="input-section d-flex justify-content-end">
        <span className="input-container">
        <input type="search" name="" placeholder="Search" className="input px-5 py-2 rounded-4" />
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
              <th key="key" className="mx-4" onClick={() => switchTab(el)}>
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
            <tr key={el.userID} className="">
              <>
                <td className="text-center px-4">{el.date}</td>
                <td className="text-center px-4">{el.userID}</td>
                <td className="text-center px-4">{el.phone}</td>
                <td className="text-center px-4">{el.description}</td>
                <td className="text-center px-4">{el.planType}</td>
                <td className="text-center px-4">{el.Duration}</td>
                <td className="text-center px-4">{el.startDate}</td>
                <td className="text-center px-4">{el.endDate}</td>
                <td className="text-center px-4">{el.paid}</td>
                <td className="text-center px-4">{el.status}</td>
                <td className="text-center px-4">{el.link}</td>
              </>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
}
