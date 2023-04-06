import Success from "../Assets/success.png";
import Pending from "../Assets/pending.png";
import Refund from "../Assets/refund.png";
import Failed from "../Assets/failed.png";

export const allTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "green",
      status: { icon: Success, statusName: "Successful" },
    },

    {
      id: 2,
      name: "Order2",

      amount: "$420.84",
      color: "blue",
      status: { icon: Pending, statusName: "Pending" },
      date: "21 Mar 2023",
    },
    {
      id: 3,

      name: "Order3",
      amount: "$420.84",
      color: "orange",
      status: { icon: Refund, statusName: "Refund" },
      date: "12 Apr 2023",
    },
    {
      id: 4,

      name: "Order3",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Canceled" },
      date: "12 Apr 2023",
    },
  ],
};
export const paidTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "green",
      status: { icon: Success, statusName: "Successful" },
    },
  ],
};
export const pendingTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "blue",
      status: { icon: Pending, statusName: "Pending" },
    },
  ],
};
export const refundTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "orange",
      status: { icon: Refund, statusName: "Refund" },
    },
  ],
};
export const failedTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Failed" },
    },
  ],
};
export const canceledTransactions = {
  headers: ["OrderID", "Date", "Status", "Amount"],
  data: [
    {
      id: 1,
      name: "Order1",
      date: "14 Mar 2023",
      amount: "$420.84",
      color: "red",
      status: { icon: Failed, statusName: "Canceled" },
    },
  ],
};
