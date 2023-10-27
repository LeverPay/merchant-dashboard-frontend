import React, { useState } from "react";
import axios from "axios";

// export const baseUrl = "http://api.leverpay.io";
export const baseUrl = "https://leverpay-api.azurewebsites.net";
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
export const create_invoice = "/api/v1/merchant/create-invoice";
export const get_invoice = "/api/v1/merchant/get-invoices";
export const paid_invoice = "/api/v1/merchant/get-invoices?status=paid";
export const pending_invoice = "/api/v1/merchant/get-invoices?status=pending";
export const cancelled_invoice =
  "/api/v1/merchant/get-invoices?status=cancelled";
export const get_invoice_by_uuid = "/api/v1/invoice/";
export const get_dashboard_data = "/api/v1/user/get-user-profile";
export const fund_transfers = "/api/v1/user/transfer";
export const get_transactions = "/api/v1/user/get-user-transactions";
export const get_all_banks = "/api/v1/user/get-all-banks";
export const add_bank_details = "/api/v1/user/add-bank-account";
export const get_user_bank_details = "/api/v1/user/get-user-bank-account";
export const add_kyc_details = "/api/v1/merchant/add-merchant-kyc";
export const get_document_types = "/api/v1/user/get-document-type";
