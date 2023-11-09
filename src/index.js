import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Stats from "./components/character/Stats";
import Print from "./components/character/Print";
import Character from "./components/character/Character";
import Treasure from "./components/Treasure";
import Monsters from "./components/Monsters";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/character" element={<Character />} />
      <Route exact path="/stats" element={<Stats />} />
      <Route exact path="/print" element={<Print />} />
      <Route exact path="/treasure" element={<Treasure />} />
      <Route exact path="/monsters" element={<Monsters />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
