import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

export const UserContext = createContext();
const initSate = {
  mssv: "",
  name: "",
  stars: {},
  accessToken: "",
  role: "",
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext.Provider value={initSate}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
