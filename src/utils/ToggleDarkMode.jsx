import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeCxt = createContext();

const ToggleDarkMode = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const ToggleColorMode = () => {
    setMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeCxt.Provider value={{ mode, setMode, ToggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeCxt.Provider>
  );
};

export default ToggleDarkMode;
