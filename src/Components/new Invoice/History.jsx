import React, { useEffect, useState } from "react";
import "./style.css";
import sent from "../../Assets/all2.png";
import paid from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import Card from "../cards/subscription-cards/Card";
import { TableHead, HeaderData, data } from "./historyData";
import { NavLink } from "react-router-dom";
import {
  baseUrl,
  get_invoice,
  paid_invoice,
  pending_invoice,
  cancelled_invoice,
} from "../Endpoints";
import axios from "axios";

export default function History() {
  const [invoice, setInvoice] = useState(null);
  const [tableHeader1, setTableHeader] = useState(TableHead);
  const [tableSubHeader1, setTableSubHeader] = useState(HeaderData);
  const [tableBody, setTableBody] = useState([]);

  const [sentData, setSentData] = useState(null);
  const [paidData, setPaidData] = useState(null);
  const [failedData, setFailedData] = useState(null);
  const [pending, setpending] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [active, setActive] = useState(null);

  // Navigate table functionality
  const switchTab = (item) => {
    // Set active table header functionality
    setActive(tableHeader1.indexOf(item));

    let updatedTableBody = [];

    if (item === "PAID") {
      updatedTableBody = paidData;
    } else if (item === "PENDING") {
      updatedTableBody = pending;
    } else if (item === "CANCELED") {
      updatedTableBody = cancelled;
    } else {
      updatedTableBody = invoice;
    }

    setTableBody(updatedTableBody);
  };

  const getInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + get_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setInvoice(req.data.data);
      console.log(req.data.data);
      // setTableBody(req.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPaidInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + paid_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setPaidData(req.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getPendingInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + pending_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setpending(req.data.data);
      setTableBody(req.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCanceledInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + cancelled_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setCancelled(req.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(cancelled, "is cancelled");

  useEffect(() => {
    getInvoice();
    getPaidInvoice();
    getPendingInvoice();
    getCanceledInvoice();
    switchTab("PENDING");
  }, []);

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
          status="Paid"
          count={paidData?.length}
          color="#0B0230"
        />

        <Card
          icon={paid}
          status="Pending"
          count={pending?.length}
          color="#0C6904"
        />

        <Card
          icon={failed}
          status="Canceled"
          count={cancelled?.length}
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
                key={i}
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

        <section className="sub-table d-flex mt-5 px-5 mx-5">
          <table className="text-center px-4 mx-5">
            {tableBody && tableBody.length > 0 && (
              <tr>
                {tableSubHeader1.map((el, i) => (
                  <th key={el.uuid}>{el}</th>
                ))}
              </tr>
            )}

            {tableBody && tableBody.length > 0 ? (
              tableBody.map((el, i) => (
                <tr key={el.id} className="fw-bolder">
                  <td className="text-center px-4 py-2">{el.email}</td>
                  <td className="text-center px-4 py-2">{el.merchant_id}</td>
                  <td
                    className="text-center px-4 py-2"
                    style={{ color: "#CB1919" }}
                  >
                    {el.product_name}
                  </td>
                  <td className="text-center px-4 py-2">
                    <NavLink className="link">View</NavLink>
                  </td>
                  <td
                    className="text-center px-4 py-2"
                    style={{
                      color: `${
                        el.status === 0
                          ? "#046A0E"
                          : el.status === 1
                          ? "#3A09FF"
                          : "#FB3105"
                      }`,
                    }}
                  >
                    {el.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="d-flex justify-content-center px-5">
                <td className="text-center" style={{ height: "100px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width:"100%",
                      margin: "auto"
                    }}
                  >
                    <p className="text-center">No data to display</p>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </section>
      </section>
    </section>
  );
}
