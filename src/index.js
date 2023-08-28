import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Stats from "./components/Stats";
import Spells from "./components/Spells";
import Character from "./components/Character";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/character" element={<Character />} />
        <Route exact path="/stats" element={<Stats />} />
        <Route exact path="/spells" element={<Spells/>} />
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
