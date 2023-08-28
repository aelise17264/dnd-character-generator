import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { statBonuses } from "../api/StatList";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";

function Stats() {
  const [statData, setStatData] = useState([]);
  let statRange = [15, 14, 13, 12, 10, 8];

  const location = useLocation();
  const charData = location.state.nameData;
  console.log("char name", charData);
  const playerBonus = statBonuses[charData];
  console.log("player bonus", playerBonus);
  const getBonuses = playerBonus?.map((stat) => {
    console.log("get bonuses called");
    return <li className="bonus">{stat}</li>;
  });

  function shuffle(arr) {
    console.log("inside shuffle");
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
      j = Math.floor(Math.random() * (index + 1));
      x = arr[index];
      arr[index] = arr[j];
      arr[j] = x;
    }
    return arr;
  }
  const getStats = () => {
    let newArr = shuffle(statRange);
    setStatData(newArr);
    console.log(statData);
  };

  let navigate = useNavigate();
  const handleArrowClick = () => navigate("/", { replace: true });
  const handleNavToSpells = () => navigate("/Spells", {replace: true});

  return (
    <div className="App">
      {/* <Header /> */}
      <div className="statsPage">
        <h1>Stats Page</h1>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "150px",
            marginBottom: "2%",
          }}
          onClick={getStats}
        >
          Get Stats
          <a>
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              shake
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>

        <div className="statGroup">
          <div className="groupOne">
            <h1>General Stats</h1>
            <ul>
              <li>Strength: {statData[0]}</li>
              <li>Dexterity: {statData[1]}</li>
              <li>Constitution: {statData[2]}</li>
              <li>Intelligence: {statData[3]}</li>
              <li>Wisdom: {statData[4]}</li>
              <li>Charisma: {statData[5]}</li>
            </ul>
          </div>
          <div className="groupTwo">
            <h1>Racial Bonuses</h1>
            <ul id="playerStats">{getBonuses}</ul>
          </div>
        </div>
        <hr/>
        <div className="navArrows">
        <div className="goBack">
          <h3>Go Back</h3>
          <p>Go back to roll a new character</p>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faLeftLong}
              size="2xl"
              style={{ color: "#282c34" }}
              onClick={handleArrowClick}
            />
          </a>
        </div>
        <div className="toSpells">
          <h3>Go Foward</h3>
          <p>If your character is a spell caster click this arrow to roll for spells</p>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faRightLong}
              size="2xl"
              style={{ color: "#282c34" }}
              onClick={handleNavToSpells}
            />
          </a>
        </div>
        </div>
        <footer>
          <img
            src="https://assetsio.reedpopcdn.com/explorers-guide-to-wildemount-dungeons-and-dragons-tabletop-roleplaying-game-image-2.jpg?width=660&quality=80&format=jpg&auto=webp"
            className="explorers"
          />
        </footer>
      </div>
    </div>
  );
}

export default Stats;
