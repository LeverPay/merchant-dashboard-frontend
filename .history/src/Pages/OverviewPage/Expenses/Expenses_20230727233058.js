import React, { useEffect, useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import Card from "../Ui/Card";
import ExpensesChart from "./ExpensesChart";
const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });
  useEffect(() => {
    filteredExpenses();
  }, []);
  return (
    <Card className="expenses">
      <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      {/* <ExpensesList items={filteredExpenses} /> */}
    </Card>
  );
};
export default Expenses;
