import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { characterSpellSlots } from "../../api/CharacterSpellSlots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { statBonuses } from "../../api/StatList";
import {
  faRightLong,
  faLeftLong,
  faHouseCrack,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

function Stats() {
  const [statData, setStatData] = useState([]);
  const [spellData, setSpellData] = useState([]);
  let statRange = [15, 14, 13, 12, 10, 8];

  const location = useLocation();
  const charData = location.state.nameData;
  const charClass = location.state.classData;
  // console.log("char name", charData);
  const playerBonus = statBonuses[charData];
  // console.log("player bonus", playerBonus);
  const getBonuses = playerBonus?.map((stat) => {
    // console.log("get bonuses called");
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

  const getSpellSlots = () => {
    characterSpellSlots.forEach((slot) => {
      console.log(charClass, "inside function");
      console.log("slot", slot);
      // console.log('inside spell call', slot.index)
      if (slot.index === charClass) {
        console.log("inside if", slot.index);
        setSpellData(slot);
      }
    });
  };
  const handleButtonClick = () => {
    getStats();
    getSpellSlots();
  };

  let navigate = useNavigate();
  const handleArrowClick = () => navigate("/Character", { replace: true });
  const handleNavToSpells = () => navigate("/Spells", { replace: true });
  const goHome = () => navigate("/", { replace: true });

  return (
    // <div className="character">
    //   {/* <Header /> */}
    <div className="statsPage">
      <div className="statButton">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          id="statHomeButton"
          onClick={goHome}
        >
          Back Home
          <a>
            <FontAwesomeIcon
              icon={faHouseCrack}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
      <h1 id="statsTitle">Stats Page</h1>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={{
          backgroundColor: "#282c34",
          border: "none",
          width: "150px",
          marginBottom: "2%",
        }}
        onClick={handleButtonClick}
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
          <h1>Spell Slots</h1>
          <p>Spells: {spellData.spells}</p>
          <p>Cantrips: {spellData.cantrips}</p>
        </div>
      </div>
      <hr />
      <div className="navArrows">
        <div className="goBack">
          <h3>Go Back</h3>
          <p>Go back to roll a new character</p>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faLeftLong}
              size="2xl"
              style={{ color: "white" }}
              onClick={handleArrowClick}
            />
          </a>
        </div>
        <div className="toSpells">
          <h3>Print Character Sheet</h3>
          <p>This isn't working yet, Sorry</p>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faScroll}
              size="2xl"
              style={{ color: "white" }}
              onClick={handleNavToSpells}
            />
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Stats;
