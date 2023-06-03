import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({ countryList }) => {
  const [value, setValue] = useState("");

  const options = useMemo(() => countryList.data, []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
};
