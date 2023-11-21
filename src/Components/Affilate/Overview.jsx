import React from "react";
import "./affilate.css";
import Card from "../cards/pages-cards/Card";
import all from "../../Assets/all2.png";
import active from "../../Assets/active.png";
import failed from "../../Assets/ep-failed.png";
import { header1, header2, Tbody } from "./affilateTable/tableData";

export default function Overview() {
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

          <section className="affilate-card-section d-flex justify-content-evenly mt-4">
            <Card icon={all} status="All" count={0} color="#0B0230" />
            <Card icon={active} status="Active" count={0} color="#0C6904" />
            <Card
              icon={failed}
              status="Suspended"
              count={0}
              color="#F40909EB"
            />
          </section>
        </section>

        <section className="overview-table-section mt-5">
          <div className="table-1">
            <table className="table">
              <thead className="d-flex px-4 py-2">
                <tr className="px-5 py-2">
                  {header1.map((item, index) => (
                    <th key={index} className="mx-4 pointer">
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

              {Tbody.map((el, i) => (
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
      </div>
    </div>
  );
}
