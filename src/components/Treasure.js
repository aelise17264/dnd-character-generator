import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import "./Components.css";

function Treasure() {
  const getTreasure = () => {
    console.log("TREASURE");
    document.getElementById("dropDowns").style.display = "none";
  };
  const refreshTreasure = () => {
    console.log("MORE TREASURE");
    document.getElementById("dropDowns").style.display = "flex";
  };

  return (
    <div className="treasurePage">
      <div className="treasure">
        <h3>Treasure Page</h3>
      </div>
      <div id="dropDowns" className="dropDowns">
        <div>
          <label for="partySize">Party Size</label>
          <input
            className="form-control"
            type="number"
            name="partySize"
          ></input>
        </div>
        <div>
          <label for="skillLevel">Party Skill Level</label>
          <select className="form-select" name="skillLevel">
            <option value="">How are they doing?</option>
            <option value="1">Lucky to still be alive</option>
            <option value="2">They're learning</option>
            <option value="3">True adventurers</option>
          </select>
        </div>
        <div>
          <label for="likability">How much do you like them?</label>
          <select className="form-select" name="likability">
            <option value="">Be honest</option>
            <option value="1">Ugh they're the worst</option>
            <option value="2">Meh they're ok</option>
            <option value="3">They're the best!</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={getTreasure}
        >
          Get Loot
          <a>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
      <div className="refresh">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={refreshTreasure}
        >
          Roll Again
          <a>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Treasure;
