import React from "react";
import "./search-bar.css";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  return (
    <>
      <div class="search-box">
        <button class="btn-search">
          <BsSearch />
        </button>
        <input type="text" class="input-search" placeholder=" Search..." />
      </div>
    </>
  );
}

export default SearchBar;
