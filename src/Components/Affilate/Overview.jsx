import React, { useState, useEffect, useContext } from "react";
import "./affilate.css";
import Card from "../cards/affiliate-cards/Card";
import all from "../../Assets/all2.png";
import activeImg from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import { header1, header2, Tbody } from "./affilateTable/tableData";
import TokenContext from "../User-Token/TokenContext";

export default function Overview() {
  const [active, setActive] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [activeNumber, setActiveNumber] = useState(null);
  const [canceledNumber, setCanceledNumber] = useState(null);
  const { notify } = useContext(TokenContext);

  const toggleActiveHeader = (item) => {
    setActive(item);
    if (item !== "All") {
      const filteredData = Tbody.filter((el) => el.status === item);
      setFiltered(filteredData);
    } else {
      setFiltered(Tbody);
    }
    console.log(filtered);
  };

  useEffect(() => {
    const active = Tbody.filter((el) => el.status === "Active");
    const canceled = Tbody.filter((el) => el.status === "Suspended");
    setActiveNumber(active.length);
    setCanceledNumber(canceled.length);
    setActive(0);
    setFiltered(Tbody);
    notify("NOTE: This page core features still in works");
  }, []);

  return (
    <div className="affilate-overview-container">
      <div className="overview-contents px-5 py-2">
        <section className="overview-header-section d-flex flex-column">
          <div className="overview-header-input d-flex justify-content-end align-items-center">
            <span className="header-input-search d-flex align-items-center">
              <img
                src={require("../../Assets/search-icon.png")}
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                className="rounded-3 px-4 py-2"
              />
            </span>
          </div>

          <section className="affilate-card-section d-flex flex-wrap justify-content-evenly mt-4">
            <Card
              icon={all}
              status="All"
              count={Tbody.length}
              color="#0B0230"
            />
            <Card
              icon={activeImg}
              status="Active"
              count={activeNumber}
              color="#0C6904"
            />
            <Card
              icon={failed}
              status="Suspended"
              count={canceledNumber}
              color="#F40909EB"
            />
          </section>
        </section>

        <section className="overview-table-section mt-5">
          <div className="table-1">
            <table className="table-1-contents">
              <thead className="d-flex mb-3">
                <tr>
                  {header1.map((item, index) => (
                    <th
                      key={index}
                      className={`px-2 py-2 pointer ${
                        active === item ? "active-header" : ""
                      }`}
                      onClick={() => toggleActiveHeader(item)}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          <div className="table-2 mt-2">
            <table className="info">
              <tr>
                {header2.map((el, i) => (
                  <th
                    className="mx-4"
                    key={i}
                    style={{ color: `${el === "Income" ? "#089A0E" : ""}` }}
                  >
                    {el}
                  </th>
                ))}
              </tr>

              {filtered.map((el, i) => (
                <tr key={el.id} className="fw-bolder">
                  <td className="text-left px-2 py-4">{el.date}</td>
                  <td className="text-left px-2 py-4 text-truncate">
                    {el.name}
                  </td>
                  <td className="text-left px-2 py-4 text-truncate">
                    {el.email}
                  </td>
                  <td className="text-left px-2 py-4">{el.phone}</td>
                  <td className="text-left px-2 py-4">{el.code}</td>
                  <td className="text-left px-2 py-4">{el.split}</td>
                  <td
                    className="text-left px-2 py-4"
                    style={{ color: "#089A0E" }}
                  >
                    {el.income}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </section>

        <div className="buttons d-flex align-items-end justify-content-end mt-5">
          <div className="prev-btn mx-4">
            <button className="btn rounded-4 fw-bolder">Previous</button>
          </div>

          <div className="next-btn">
            <button className="btn rounded-4 fw-bolder">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
