import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { nameList } from "./api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import { faDiceD20, faRightLong } from "@fortawesome/free-solid-svg-icons";

function App() {
  let navigate = useNavigate();
  const navToCharacter = () => navigate("/character", { replace: true });

  const navToMonster = () => navigate("/monsters", { replace: true });

  const navToTreasure = () => navigate("/treasure", { replace: true });

  return (
    <div className="App">
      {/* <Header /> */}
      {/* <h2>This is now a landing page</h2> */}
      <div id="buffer"></div>
      <div className="scroll">
        <div className="welcome">
          <h2>Welcome Traveler</h2>
          <p>
            Planning a campaign? Need to quickly throw together some NPCs? Want
            your team to find some exciting treasure along the way?
          </p>
          <p>Roll the dice bellow for chaotic choices from each category.</p>
          <p>
            You can save or print the final product to take with you to your
            next campaign
          </p>
        </div>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#966919", border: "none", width: "220px" }}
          onClick={navToCharacter}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Character
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#6E260E", border: "none", width: "220px" }}
          onClick={navToTreasure}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Treasure
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#6F4E37", border: "none", width: "220px" }}
          onClick={navToMonster}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Monster
        </button>
      </div>
    </div>
  );
}

export default App;

const abilityStats = [15, 14, 13, 12, 10, 8];
const basicPerception = 10;
// let showChar = 'hidden'
// Attack modifiers
// const attackRange = dex + profModifier
// const attackBasicRange = dex
// const attackMele = strength + profModifier
// const attackBasicMele = strength

// armor class

// let [responseName, setResponseName] = React.useState('')

function generateCharacter() {
  // let newCharName
  document.getElementById("hideForm").style.display = "block";
  // console.log(newCharList[newCharIndex])
  // return newCharName
}
