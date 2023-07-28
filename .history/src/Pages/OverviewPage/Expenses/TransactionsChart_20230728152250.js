import React from "react";
import Chart from "../Chart/Chart";

const TransactionsChart = (props) => {
  const chartDataPoints = [
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
  ];

  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth(); //starting at 0 => january => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return <Chart dataPoints={chartDataPoints} />;
};

export default TransactionsChart;
