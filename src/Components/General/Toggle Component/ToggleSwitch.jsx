import React, { useState } from "react";
import Switch from "@mui/joy/Switch";

export default function ToggleSwitch() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Switch checked={checked} onChange={handleChange} />
    </div>
  );
}
