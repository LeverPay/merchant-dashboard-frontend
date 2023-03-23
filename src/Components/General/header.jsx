import React from "react";
import Logo from "../../Components/General/Header components/logo";
import Profile from "../../Components/General/Header components/profile";
import "../../index.css";

export default function Header() {
  return (
    <header>
      <div className="d-flex justify-content-between px-4 py-3">
        <Logo />
        <Profile />
      </div>
    </header>
  );
}
