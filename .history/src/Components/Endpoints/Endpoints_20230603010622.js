import React, { useState } from "react";
import axios from "axios";

const baseUrl = "http://api.leverpay.io";
// const [data, setData] = useState([]);
export const fetchInfo = async (props) => {
  const response = await axios.get(baseUrl + props.endPoint);
  return response.data;
};
export const countries = "/api/v1/get-countries";
