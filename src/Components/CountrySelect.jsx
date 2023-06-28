import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";

export const CountrySelect = ({
  countyList,
  selector,
  callback,
  value,
  placeholder,
  disabled,
}) => {
  const [selected_id, setSelectedId] = useState("");
  let options; // = useMemo(() => countryList().getData(), []);

  if (countyList && countyList.data) {
    console.log("Save to map");
    options = countyList.data.map((opt, index) => {
      let labl;
      if (selector == "country_name") labl = opt.country_name;
      else if (selector == "state_name") labl = opt.state_name;
      else if (selector == "city_name") labl = opt.city_name;
      return {
        label: labl,
        value: opt.id,
      };
    });
  }
  const changeHandler = (e) => {
    setSelectedId(e.value);
  };

  useEffect(() => {
    if (value && value.value) {
      setSelectedId(value.value);
    }
  }, [value]);

  useEffect(() => {
    {
      if (callback !== undefined) callback(selected_id);
    }
  }, [selected_id]);

  const customPlaceholder = "Choose an option";
  return (
    <Select
      onChange={changeHandler}
      options={options}
      value={
        selected_id
          ? {
              label: options && options.find((option) => option.value === selected_id)
                ?.label,
              value: selected_id,
            }
          : null
      }
      placeholder={placeholder}
      isDisabled={disabled}
    />
  );
};
