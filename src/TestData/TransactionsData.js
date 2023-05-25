import Success from "../Assets/success.png";
import Pending from "../Assets/pending.png";
import Refund from "../Assets/refund.png";
import Failed from "../Assets/failed.png";

export const allTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount", "INVOICE", "Support"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "green",
      status: { icon: Success, statusName: "Successful" },
      invoice: "View",
      help: "Need help with this transaction?",
    },

    {
      id: 2,
      name: "Order2",

      amount: "$420.84",
      color: "blue",
      status: { icon: Pending, statusName: "Pending" },
      date: "21 Mar 2023",
      invoice: "View",
      help: "Need help with this transaction?",
    },
    {
      id: 3,

      name: "Order3",
      amount: "$420.84",
      color: "orange",
      status: { icon: Refund, statusName: "Refund" },
      date: "12 Apr 2023",
      invoice: "View",
      help: "Need help with this transaction?",
    },
    {
      id: 4,

      name: "Order4",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Canceled" },
      date: "12 Apr 2023",
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
export const paidTransactions = {
  headers: [
    "OrderID",
    "Date",
    "Status",
    "Amount",
    "INVOICE",
    "Need help with this transaction?",
  ],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "green",
      status: { icon: Success, statusName: "Successful" },
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
export const pendingTransactions = {
  headers: [
    "OrderID",
    "Date",
    "Status",
    "Amount",
    "INVOICE",
    "Need help with this transaction?",
  ],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "blue",
      status: { icon: Pending, statusName: "Pending" },
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
export const refundTransactions = {
  headers: [
    "OrderID",
    "Date",
    "Status",
    "Amount",
    "INVOICE",
    "Need help with this transaction?",
  ],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "orange",
      status: { icon: Refund, statusName: "Refund" },
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
export const failedTransactions = {
  headers: [
    "OrderID",
    "Date",
    "Status",
    "Amount",
    "INVOICE",
    "Need help with this transaction?",
  ],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Failed" },
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
export const canceledTransactions = {
  headers: [
    "OrderID",
    "Date",
    "Status",
    "Amount",
    "INVOICE",
    "Need help with this transaction?",
  ],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Canceled" },
      invoice: "View",
      help: "Need help with this transaction?",
    },
  ],
};
