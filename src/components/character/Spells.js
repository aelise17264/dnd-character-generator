import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

import "../Components.css";

function Spells() {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  let baseSpellURL = "https://www.dnd5eapi.co/api/spells/";

  const [spellData, setSpellData] = useState([]);
  const [firstSpellData, setFirstSpell] = useState([]);
  const [secondSpellData, setSecondSpell] = useState([]);
  const [completeFirstSpell, setCompleteFirstSpell] = useState([]);

  // const createSpellList = () => {
  //   getSpells();
  //   spellDetails();
  // }
  const getSpells = () => {
    axios
      .get(baseSpellURL)
      .then((res) => {
        let spellList = res.data.results;
        let firstSpellIndex = randomNumber(1, 319);
        let secondSpellIndex = randomNumber(1, 319);
        console.log(firstSpellIndex);
        setFirstSpell(spellList[firstSpellIndex].index);
        setSecondSpell(spellList[secondSpellIndex].index);

        // console.log(spellData)
      })
      .then(() => {
        // spellData.forEach(spell => {
        //   console.log("inside for each")
        axios.get(baseSpellURL + firstSpellData.toString()).then((res) => {
          console.log(firstSpellData);
          console.log("spell data", res.data);
          setCompleteFirstSpell(res.data);
          let description = res.data.desc;
          description.forEach((item) => {
            let li = document.createElement("li");
            let text = document.createTextNode(item);
            li.appendChild(text);
            document.getElementById("descriptionList").appendChild(li);
          });
          // })
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // const spellDetails = async () => {
  //   await getSpells()
  //   console.log("outside axios call", spellData)

  // }

  // const getSpellSpecifics = (spellData) =>{
  // useEffect(() => {
  //   createSpellList()
  // }, [])
  // }

  return (
    <div className="spellPage">
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
        <h2>Spells</h2>
        <h3>{completeFirstSpell.name}</h3>
        <p> Range: {completeFirstSpell.range}</p>
        <p>Duration: {completeFirstSpell.duration}</p>
        <p>Description</p>
        <div id="descriptionList"></div>
      </div>
    </div>
  );
}

export default Spells;
