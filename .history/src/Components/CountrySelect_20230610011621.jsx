import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({ countyList, callback }) => {
  const [country_id, setCountryId] = useState("");
  let options; // = useMemo(() => countryList().getData(), []);

  if (countyList && countyList.data) {
    console.log("Save to map");
    options = countyList.data.map((opt, index) => {
      return {
        label: opt.country_name,
        value: opt.id,
      };
    });
  }
  const changeHandler = (e) => {
    setCountryId(e.value);
  };
  useEffect(() => {
    {
      if (callback !== undefined) callback(country_id);
    }
  }, [country_id]);
  return <Select onChange={changeHandler} options={options} />;
};
