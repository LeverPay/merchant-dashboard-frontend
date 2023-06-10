import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({ countyList, selector, callback }) => {
  const [selected_id, setSelectedId] = useState("");
  let options; // = useMemo(() => countryList().getData(), []);

  if (countyList && countyList.data) {
    console.log("Save to map");
    options = countyList.data.map((opt, index) => {
      return {
        label: selector == "country_name" ? opt.country_name : opt.state_name,
        value: opt.id,
      };
    });
  }
  const changeHandler = (e) => {
    setSelectedId(e.value);
  };
  useEffect(() => {
    {
      if (callback !== undefined) callback(selected_id);
    }
  }, [selected_id]);
  return <Select onChange={changeHandler} options={options} />;
};
