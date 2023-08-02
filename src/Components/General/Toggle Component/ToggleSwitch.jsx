import React, { useState } from "react";
import { Switch, createTheme, ThemeProvider } from "@mui/material";

export default function ToggleSwitch({color, checked, handleChange}) {
//   const [checked, setChecked] = useState(false);

//   const handleChange = () => {
//     setChecked((prev) => !prev);
//   };

  const customTheme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              "& .MuiSwitch-thumb": {
                color: "#d9dbd9",
              },
            },
          },
        },
      },
    },
    palette: {
      primary: {
        main: color, //body color when checked
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Switch checked={checked} onChange={handleChange} />
      </div>
    </ThemeProvider>
  );
}
