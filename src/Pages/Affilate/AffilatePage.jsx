import React from "react";
import Registeration from "../../Components/Affilate/Registeration";
import Overview from "../../Components/Affilate/Overview";
import IncomeEarned from "../../Components/Affilate/IncomeEarned";
import { useLocation } from "react-router-dom";

export default function AffilatePage() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      {path === "/registration" ? (
        <Registeration />
      ) : path === "/overview" ? (
        <Overview />
      ) : path === "/income" ? (
        <IncomeEarned />
      ) : (
        ""
      )}
    </div>
  );
}
