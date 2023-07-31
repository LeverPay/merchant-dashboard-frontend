import React, { useState } from "react";
import axios from "axios";

// export const baseUrl = "https://leverpay-api.azurewebsites.net/api/v1";
export const baseUrl = "http://api.leverpay.io";
export const fetchInfo = async (props) => {
  const response = await axios.get(baseUrl + props.endPoint);
  return response.data;
};
export const countries = "/api/v1/get-countries";
export const states = "/api/v1/get-states";
export const cities = "/api/v1/get-cities";
export const signup = "/api/v1/merchant/signup";
export const verify_Mail = "/api/v1/verify-email";
export const resendVerification_Token = "/api/v1/resend-verification-email";
export const login = "/api/v1/login";
export const get_Merchant_Profile = "/api/v1/merchant/get-merchant-profile";
export const update_Merchant_Profile =
  "/api/v1/merchant/update-merchant-profile";
export const forgot_Password = "/api/v1/forgot-password";
export const Reset_password = "/api/v1/reset-password";
export const get_currencies = "/api/v1/merchant/get-merchant-currencies";
export const logout = "/api/v1/merchant/logout";
export const update_payment_Method = "/api/v1/admin/add-payment-option";
