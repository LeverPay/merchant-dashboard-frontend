import React, { useState } from "react";
import axios from "axios";

const baseUrl = "http://api.leverpay.io";
// const [data, setData] = useState([]);
export const fetchInfo = (props) => {
  // return props;
  return axios.get(baseUrl + props.endPoint).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const countries = "/api/v1/get-countries";
