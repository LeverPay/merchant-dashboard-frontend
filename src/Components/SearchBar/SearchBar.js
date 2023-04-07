import React from "react";
import "./search-bar.css";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  return (
    <>
      <div className="search-box">
        <button className="btn-search">
          <BsSearch />
        </button>
        <input type="text" className="input-search" placeholder=" Search..." />
      </div>
    </>
  );
}

export default SearchBar;
