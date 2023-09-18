import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import "./Components.css";

function Treasure() {
  const baseURL = "https://www.dnd5eapi.co/api/";

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  let partySize = "";
  let partySkill = "";
  let partyFavor = "";

  const getTreasure = () => {
    partySize = document.getElementById("partySize").value;
    partySkill = document.getElementById("skillLevel").value;
    partyFavor = document.getElementById("likeability").value;
    console.log("TREASURE");
    document.getElementById("dropDowns").style.display = "none";
    document.getElementById("lootList").style.display = "block";
    // console.log(goldCount)
    setGoldCount(partySize)
    itemsFound(partySize, partySkill)
  };
const setGoldCount = (count) => {
  document.getElementById("goldCount").innerHTML = "Gold: " + count * 100
}

const itemsFound = (count, skill) => {
  axios
  .get(baseURL + `/equipment-categories/standard-gear`)
  .then((res) => {
    console.log(res.data.equipment.length)
    const numOfEqui = randomNumber(0, 94)
    document.getElementById("equipmentFound").innerHTML = "Equipment: "
    
}) .catch((error) => {
  console.log(error);
});
}

  const refreshTreasure = () => {
    console.log("MORE TREASURE");
    document.getElementById("dropDowns").style.display = "flex";
    document.getElementById("lootList").style.display = "none";
    console.log(goldCount)
    document.getElementById("partySize").value = ""
    partySize = "";
    partySkill = "";
    partyFavor = "";
    console.log("should be empty");
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
            id="partySize"
            className="form-control"
            type="number"
            name="partySize"
            placeholder=""
          ></input>
        </div>
        <div>
          <label for="skillLevel">Party Skill Level</label>
          <select id="skillLevel" className="form-select" name="skillLevel">
            <option value="">How are they doing?</option>
            <option value="1">Lucky to still be alive</option>
            <option value="2">They're learning</option>
            <option value="3">True adventurers</option>
          </select>
        </div>
        <div>
          <label for="likability">How much do you like them?</label>
          <select id="likeability" className="form-select" name="likability">
            <option value="">Be honest</option>
            <option value="1">Ugh they're the worst</option>
            <option value="2">Meh they're ok</option>
            <option value="3">They're the best!</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          id="lootButton"
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
      <div className="lootList" id="lootList" style={{display: "none"}}>
          <h3>Treasure!</h3>
          <h3 id="goldCount"></h3>
          <h3 id="equipmentFound"></h3>
     
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
      </div> </div>
    </div>
  );
}

export default Treasure;
