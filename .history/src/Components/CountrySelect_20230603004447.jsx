import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { fetchInfo, countries } from "./Endpoints";

export const CountrySelect = () => {
  const [value, setValue] = useState("");
  const [countriesData, setCountries] = useState({});

  useEffect(() => {
    const countyList = fetchInfo({ endPoint: countries });
    setCountries(countyList);
    console.log(countriesData);
  });
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
};
