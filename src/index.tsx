import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider as StatusProvider} from "./context/status/StatusContext";
import {Provider as ThemeProvider} from "./context/ThemeContext";

import "./theme.css";

ReactDOM.render(
  <React.StrictMode>
    <StatusProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StatusProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
