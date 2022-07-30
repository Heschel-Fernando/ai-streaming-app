import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleDarkMode from "./utils/ToggleDarkMode";

const theme = createTheme({
  typography: {
    fontFamily: ["DM Sans"].join(","),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ToggleDarkMode theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleDarkMode>
  </Provider>,

  document.getElementById("root")
);
