import React, { useEffect, useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import Card from "../Ui/Card";
import TransactionsChart from "./TransactionsChart";
const Transactions = (props) => {
  const [filteredYear, setFilteredYear] = useState("2023");
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <Card className="expenses2 expenses">
      {/* <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      /> */}
      <TransactionsChart expenses={filteredExpenses} />
    </Card>
  );
};
export default Transactions;
