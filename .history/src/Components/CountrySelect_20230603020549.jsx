import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({ countyList }) => {
  const [value, setValue] = useState("");
  console.log(countyList.data);
  const options = countyList.data.map((opt, index) => {
    return { value: id, label: country_name };
  });

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <select onChange={changeHandler}>
      <option>Select...</option>
      {countyList == undefined
        ? countyList.data.map((opt, index) => {
            <option value={opt.id}>{opt.country_name}</option>;
          })
        : ""}
    </select>
  );
};
