import React, { useEffect, useState } from "react";
import "./style.css";
import sent from "../../Assets/all2.png";
import paid from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import Card from "../cards/pages-cards/Card";
import { TableHead, HeaderData, data } from "./historyData";
import { NavLink } from "react-router-dom";
import {
  baseUrl,
  get_invoice,
  paid_invoice,
  pending_invoice,
  cancelled_invoice,
  get_invoice_by_uuid,
} from "../Endpoints";
import axios from "axios";
import Invoice from "./invoice";
import Button from "../General/Button component/Button";
import Loading from "../General/loading animation/loading";
import TokenContext from "../User-Token/TokenContext";
import { useContext } from "react";

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
  const [closeDetails, setCloseDetails] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [displayItems, setDisplayItems] = useState(7);
  const [animate, setAnimate] = useState(false);
  const { notify } = useContext(TokenContext);

  // Close invoice details container
  const details = () => {
    setCloseDetails(!closeDetails);
  };

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
    setDisplayItems(7);
  };

  const loadMoreItems = () => {
    setDisplayItems((prevDisplayedItems) => prevDisplayedItems + 7);
  };

  const getInvoice = async () => {
    try {
      const req = await axios.get(baseUrl + get_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setInvoice(req.data.data);
      // setTableBody(req.data.data);
    } catch (err) {
      console.log(err);
      notify("Something Went wrong getting invoices");
    }
  };

  const getPaidInvoice = async () => {
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + paid_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      if (req.status === 200) {
        setAnimate(false);
        setPaidData(req.data.data);
      }
    } catch (err) {
      setAnimate(false);
      console.log(err);
      notify("Something Went wrong getting paid invoices");
    }
  };
  const getPendingInvoice = async () => {
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + pending_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      if (req.status === 200) {
        setAnimate(false);
        setpending(req.data.data);
        setTableBody(req.data.data);
      }
    } catch (err) {
      setAnimate(false);
      console.log(err);
      notify("Something Went wrong getting pending invoices");
    }
  };
  const getCanceledInvoice = async () => {
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + cancelled_invoice, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      if (req.status === 200) {
        setCancelled(req.data.data);
        setAnimate(false);
      }
    } catch (err) {
      setAnimate(false);
      console.log(err);
      notify("Something Went wrong getting canceled invoices");
    }
  };
  const getSingleInvoice = async (uuid) => {
    details();
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + get_invoice_by_uuid + uuid);
      if (req.status == 200) {
        setAnimate(false);
        setInvoiceDetails(req.data.data);
      }
    } catch (err) {
      setAnimate(false);
      console.log(err);
      notify("Something Went wrong getting invoices data");
    }
  };

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

        <section className="sub-table d-flex mt-5">
          <table className="text-left px-5">
            {tableBody && tableBody.length > 0 && (
              <tr>
                {tableSubHeader1.map((el, i) => (
                  <th key={el.uuid}>{el}</th>
                ))}
              </tr>
            )}

            {tableBody && tableBody.length > 0 ? (
              tableBody.slice(0, displayItems).map((el, i) => (
                <tr key={el.id} className="fw-bolder">
                  <td className="text-left px-2 py-2">{el.email}</td>
                  <td
                    className="text-left px-2 py-2"
                    style={{ color: "#CB1919" }}
                  >
                    {el.product_name}
                  </td>
                  <td>{Math.floor(el.price)}</td>
                  <td className="text-left px-2 py-2">
                    <NavLink
                      className="link"
                      onClick={() => getSingleInvoice(el.uuid)}
                    >
                      View
                    </NavLink>
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
                      width: "100%",
                      margin: "auto",
                    }}
                  >
                    {!animate ? (
                      <p className="text-center">No data to display</p>
                    ) : (
                      <p>
                        <Loading />
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </table>
        </section>
        <div className="btn-container d-flex justify-content-center mt-3">
          {tableBody?.length > 7 && (
            <Button
              style={{ color: "#fff", backgroundColor: "#0051FF" }}
              click={loadMoreItems}
            >
              View more
            </Button>
          )}
        </div>
      </section>
      {closeDetails && (
        <Invoice closeMe={setCloseDetails} details={invoiceDetails} />
      )}
    </section>
  );
}
