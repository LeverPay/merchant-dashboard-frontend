import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export const CountrySelect = ({ countyList }) => {
  const [value, setValue] = useState("");
  let options = useMemo(() => countryList().getData(), []);

  if (countyList && countyList.data) {
    console.log("Save to map");
    options = countyList.data.map((opt, index) => {
      return {
        label: opt.country_name,
        value: opt.id,
      };
    });
  }
  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select onChange={changeHandler} options={options} />;
};
