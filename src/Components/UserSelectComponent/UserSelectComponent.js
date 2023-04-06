import React from "react";
import Select from "react-select";
import "./UserSelectComponent.css";
const options = [
  { value: "Weekly", label: "Weekly" },
  { value: "Daily", label: "Monthly" },
  { value: "Monthly", label: "Monthly" },
];
export const UserSelectComponent = () => {
  return (
    <div>
      {" "}
      <Select options={options} placeholder="Daily" />
    </div>
  );
};

export default UserSelectComponent;
