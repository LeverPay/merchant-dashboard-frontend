import React, { useLayoutEffect, useRef, useState } from "react";
import TopNav from "./Header-components/TopNav";
import SidebarNav from "./SidebarNav";
import { useLocation } from "react-router-dom";

export default function Header() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const location = useLocation();
  let name = location.pathname;
  let firstchar = name.replace(/^./, "").slice(0, 1).toUpperCase();
  let pageName = firstchar.concat(name.replace(/^./, "").slice(1));
  let symbol = pageName.indexOf("_") + 1;
  const replace = pageName.charAt(symbol).toUpperCase();
  // console.log(pageName.split("").splice(symbol, 0, replace));
  const arr = pageName.split("");
  arr.splice(symbol, 1, replace);
  const replaced = arr.join("");

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <header>
      <nav className="top-nav" ref={ref}>
        <div className="d-flex flex-column justify-content-between border-bottom shadow-sm px-4 py-3">
          <TopNav />
          <div
            className={`fw-semibold fs-5 ${
              pageName === `Profile` ||
              pageName === `Transactions` ||
              pageName === `Security` ||
              (pageName === `Payment_method` && symbol !== -1)
                ? `text-left`
                : `text-center`
            }`}
          >
            {pageName === ""
              ? (pageName = "Overview")
              : pageName.includes("_")
              ? replaced.replace("_", " ")
              : pageName}
          </div>
        </div>
      </nav>

      <SidebarNav fixedTopHeight={height} />
    </header>
  );
}
