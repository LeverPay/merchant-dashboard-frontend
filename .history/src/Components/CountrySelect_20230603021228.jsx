import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export const CountrySelect = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select onChange={changeHandler} options={options} />;
};
