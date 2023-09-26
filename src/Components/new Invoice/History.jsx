import React, { useEffect, useState } from "react";
import "./style.css";
import sent from "../../Assets/all2.png";
import paid from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import Card from "../cards/subscription-cards/Card";
import { TableHead, HeaderData, data } from "./historyData";
import { NavLink } from "react-router-dom";
import { baseUrl, get_invoice } from "../Endpoints";
import axios from "axios";

export default function History() {
  const [tableHeader1, setTableHeader] = useState(TableHead);
  const [tableSubHeader1, setTableSubHeader] = useState(HeaderData);
  const [tableBody, setTableBody] = useState(data);

  const [sentData, setSentData] = useState(null);
  const [paidData, setPaidData] = useState(null);
  const [failedData, setFailedData] = useState(null);
  const [filtered, setFiltered] = useState(
    tableBody.filter((el) => el.status === "Sent")
  );
  const [active, setActive] = useState(null);

  const filteredItems = () => {
    const sent = tableBody.filter((el) => el.status === "Sent");
    const paid = tableBody.filter((el) => el.status === "Received");
    const failed = tableBody.filter((el) => el.status === "failed");

    setSentData(sent);
    setPaidData(paid);
    setFailedData(failed);
  };

  // Navigate table functionality
  const switchTab = (item) => {
    // Set active table header functionality
    const activeTab = tableHeader1.indexOf(item);
    setActive(activeTab);

    if (item === null || item === "Sent" || item === undefined) {
      setFiltered(sentData);
    } else {
      const Data = tableBody.filter((el) =>
        el.status.toLowerCase() === item.toLowerCase()
          ? el.status.toLowerCase() === item.toLowerCase()
          : item.toLowerCase() === "PAID".toLowerCase()
          ? el.status === "Received"
          : ""
      );
      setFiltered(Data);
    }
  };

  const getInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + get_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(req);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {
    filteredItems();
  }, [filtered]);

  return (
    <section className="history d-flex flex-column">
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

      <section className="card-section d-flex flex-wrap align-items-lg-center justify-content-center mt-4">
        <Card
          icon={sent}
          status="Active"
          count={sentData?.length}
          color="#0B0230"
        />

        <Card
          icon={paid}
          status="Pending"
          count={paidData?.length}
          color="#0C6904"
        />

        <Card
          icon={failed}
          status="Failed"
          count={failedData?.length}
          color="#FD3003"
        />
      </section>

      <section
        className="invoice-history-table d-flex flex-column justify-content-center mt-5 
      border border-light-subtle rounded"
      >
        <table className="mt-5">
          <tr>
            {tableHeader1.map((el, i) => (
              <th
                className={`table-header text-center mx-5 ${
                  active === i ? "active-header" : ""
                }`}
                onClick={() => switchTab(el)}
              >
                {el}
              </th>
            ))}
          </tr>
        </table>

        <section className="sub-table d-flex mt-5 px-4">
          <table className="text-center px-4 mx-5">
            <tr>
              {tableSubHeader1.map((el, i) => (
                <th>{el}</th>
              ))}
            </tr>

            {filtered.map((el, i) => (
              <tr key={el.id} className="fw-bolder">
                <td className="text-center px-4 py-2">{el.date}</td>
                <td className="text-center px-4 py-2">{el.SenderID}</td>
                <td className="text-center px-4 py-2">{el.ReceiverID}</td>
                <td
                  className="text-center px-4 py-2"
                  style={{ color: "#CB1919" }}
                >
                  {el.productName}
                </td>
                <td
                  className="text-center px-4 py-2"
                  style={{ color: "#FFCC16" }}
                >
                  {el.Notification}
                </td>
                <td className="text-center px-4 py-2">
                  <NavLink className="link">{el.details}</NavLink>
                </td>
                <td
                  className="text-center px-4 py-2"
                  style={{
                    color: `${
                      el.status === "Received"
                        ? "#046A0E"
                        : el.status === "Sent"
                        ? "#3A09FF"
                        : "#FB3105"
                    }`,
                  }}
                >
                  {el.status}
                </td>
              </tr>
            ))}
          </table>
        </section>
      </section>
    </section>
  );
}
