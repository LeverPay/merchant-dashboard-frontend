import React, { useLayoutEffect, useRef, useState } from "react";
import TopNav from "./Header-components/TopNav";
import SidebarNav from "./SidebarNav";
import { useLocation } from "react-router-dom";

export default function Header() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const location = useLocation();
  console.log(location.pathname);
  let name = location.pathname;
  const pageName = name.replace(/^./, "").slice(0).toUpperCase();

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <header>
      <nav className="top-nav" ref={ref}>
        <div className="d-flex flex-column justify-content-between border-bottom shadow-sm px-4 py-3">
          <TopNav />
          <div className="fw-semibold fs-5">{pageName}</div>
        </div>
      </nav>

      <SidebarNav fixedTopHeight={height} />
    </header>
  );
}
