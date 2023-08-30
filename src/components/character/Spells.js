import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { spellListL1 } from "../../api/SpellList";
import "../Components.css";

function Spells() {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  let baseSpellURL = "https://www.dnd5eapi.co/api/spells/";
  const [firstSpellData, setFirstSpell] = useState([]);
  const [secondSpellData, setSecondSpell] = useState([]);
  const [cantripData, setCantrip] = useState([]);

  const firstSpell = spellListL1.spells[randomNumber(1, 20)];
  const secondSpell = spellListL1.spells[randomNumber(1, 20)];
  const cantrip = spellListL1.cantrips[randomNumber(1, 8)];

  const setSpellList = (spell) => {
    console.log("inside for each");

    axios
      .get(baseSpellURL + spell.toString())
      .then((res) => {
        console.log(spell);
        console.log("spell data", res.data);
        let description = res.data.desc;
        let li = document.createElement("li");

        description.forEach((item) => {
          let text = document.createTextNode(item);
          li.appendChild(text);
        });
        if (res.data.index == cantrip) {
          setCantrip(res.data);
          document.getElementById("cantripDesc").appendChild(li);
          // });
        } else if (res.data.index == secondSpell) {
          setSecondSpell(res.data);

          document.getElementById("descriptionList2").appendChild(li);
          // });
        } else {
          setFirstSpell(res.data);
          document.getElementById("descriptionList1").appendChild(li);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getSpells = () => {
    console.log("get spells");
    setSpellList(firstSpell);
    setSpellList(secondSpell);
    setSpellList(cantrip);
    document.getElementById("spellPage").style.height = "auto";
  };
  let navigate = useNavigate();
  const handleNavToFinal = () => navigate("/Final", { replace: true });

  return (
    <div id="spellPage" className="spellPage">
      <div className="spells">
        <h3>Spell Page</h3>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={getSpells}
        >
          Get Spells
          <a>
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              shake
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
      <div className="spellList">
        <div className="spellGroup1">
          <h2>Spell 1</h2>
          <h3>{firstSpellData.name}</h3>
          <div id="descriptionList1"></div>
          <p>Range: {firstSpellData.range}</p>
          <p>Time: {firstSpellData.casting_time}</p>
          <p>Duration: {firstSpellData.duration}</p>
          <p>Attack Type: {firstSpellData.attack_type}</p>
          <p>Material: {firstSpellData.material}</p>
        </div>
        <div className="spellGroup2">
          <h2>Spell 2</h2>
          <h3>{secondSpellData.name}</h3>
          <div id="descriptionList2"></div>
          <p>Range: {secondSpellData.range}</p>
          <p>Time: {secondSpellData.casting_time}</p>
          <p>Duration: {secondSpellData.duration}</p>
          <p>Attack Type: {secondSpellData.attack_type}</p>
          <p>Material: {secondSpellData.material}</p>
        </div>
        <div className="cantripGroup">
          <h2>Cantrip</h2>
          <h3>{cantripData.name}</h3>

          <div id="cantripDesc"></div>
          <p>Range: {cantripData.range}</p>
          <p>Time: {cantripData.casting_time}</p>
          <p>Duration: {cantripData.duration}</p>
          <p>Attack Type: {cantripData.attack_type}</p>
          <p>Material: {cantripData.material}</p>
        </div>
      </div>
      <footer>
        <div className="toFinal">
          <h3>Go Foward</h3>
          <p>
            Happy with all your rolls? Click to the next page to see all your
            character info & print out your character sheet
          </p>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faRightLong}
              size="2xl"
              style={{ color: "white" }}
              onClick={handleNavToFinal}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Spells;
