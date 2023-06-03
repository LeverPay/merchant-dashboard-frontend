import React, { useState } from "react";
import axios from "axios";

const baseUrl = "http://api.leverpay.io";
// const [data, setData] = useState([]);
export const fetchInfo = (props) => {
  return axios.get(baseUrl + props.endPoint).then((response) => {
    return response.data;
  });
};
export const countries = "/api/v1/get-countries";
