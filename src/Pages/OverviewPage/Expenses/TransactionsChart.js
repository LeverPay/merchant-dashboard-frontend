import React from "react";
import Chart2 from "../Chart/Chart2";

const getWeeksInMonth = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();
  const totalWeeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
  return totalWeeks;
};

const TransactionsChart = (props) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const weeksInCurrentMonth = getWeeksInMonth(currentYear, currentMonth);

  // array of objects, each representing a week in the month
  const chartDataPoints = Array.from(
    { length: weeksInCurrentMonth },
    (_, index) => {
      // manually set different values for specific indexes here
      const customValues = {
        // update .value with endpoint data
        0: { label: "Custom Week 1", value: 0 },
        1: { label: "Custom Week 2", value: 0 },
        2: { label: "Custom Week 3", value: 0 },
        3: { label: "Custom Week 4", value: 0 },
      };

      // whenever month has 5 weeks
      if (weeksInCurrentMonth === 5 && index === 4) {
        customValues[index] = { label: "Custom Week 5", value: 0 };
      }

      // Use custom values if available, otherwise, initialize with 0
      return customValues[index] || { label: `Week ${index + 1}`, value: 0 };
    }
  );

  // Update values based on expenses
  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth();
    if (expenseMonth === currentMonth) {
      const weekIndex = Math.floor(
        (expense.date.getDate() + expense.date.getDay() - 1) / 7
      );
      chartDataPoints[weekIndex].value += expense.amount;
    }
  }

  return <Chart2 dataPoints={chartDataPoints} />;
};

export default TransactionsChart;
