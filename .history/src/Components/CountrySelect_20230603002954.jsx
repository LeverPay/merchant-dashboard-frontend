import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { fetchInfo, countries } from "./Endpoints";
export const CountrySelect = () => {
  const [value, setValue] = useState("");
  // const options = useMemo(() => countryList().getData(), []);
  const options = useMemo(() => fetchInfo({ endPoint: countries }), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
};
