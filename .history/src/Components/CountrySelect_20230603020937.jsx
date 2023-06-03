import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({ countyList }) => {
  const [value, setValue] = useState("");
  console.log(countyList.data);
  const options = {};

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select onChange={changeHandler} options={options} />;
};
