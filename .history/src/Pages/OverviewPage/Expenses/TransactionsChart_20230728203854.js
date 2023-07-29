import React from "react";
import Chart2 from "../Chart/Chart2";

const TransactionsChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "May", value: 0 },
  ];

  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth(); //starting at 0 => january => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return <Chart2 dataPoints={chartDataPoints} />;
};

export default TransactionsChart;
