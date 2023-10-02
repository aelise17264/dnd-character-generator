import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faHouseCrack } from "@fortawesome/free-solid-svg-icons";
import { monsterList } from "../api/MonsterList";

import "./Components.css";
import { act } from "@testing-library/react";

function Monsters() {
  let [monsterData, setMonsterData] = useState([]);
  let [monsterImage, setMonsterImage] = useState("");
  const [speedStats, setSpeedInfo] = useState("");
  const [actionList, setActionList] = useState([]);
  const [armorStats, setArmorClass] = useState([]);
  // let armorType;

  const baseURL = "https://www.dnd5eapi.co/api/monsters/";
  let navigate = useNavigate();
  const navHome = () => navigate("/", { replace: true });

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getMonster = () => {
    generateMonster();
    // let actions = ""
    const monsterIndex = randomNumber(0, 40);
    const ourMonster = monsterList[monsterIndex].index;
    setMonsterImage(monsterList[monsterIndex].img);
    axios
      .get(baseURL + ourMonster)
      .then((res) => {
        let monsterDetails = res.data;
        setMonsterData(monsterDetails);
        console.log("description", monsterDetails.desc);

        let armorClass = monsterDetails.armor_class;
        if (armorClass == undefined) {
          return "";
        }
        if (armorClass[0].armor !== undefined) {
          console.log("inside if", armorClass[0].armor[0].name);
          let armorType = armorClass[0].armor[0].name;
          let armorValue = armorClass[0].value;
          setArmorClass([armorType, armorValue]);
        } else {
          console.log("inside else");
          console.log(armorClass[0].type);
          let naturalArmor = armorClass[0].type;
          let naturalValue = armorClass[0].value;
          setArmorClass([naturalArmor, naturalValue]);
        }

        let actions = monsterDetails.actions;
        console.log("set actions", actions);
        setActionList(actions);
        console.log(actions);
        if (actions == undefined) {
          return "";
        }
        actions.forEach((action) => {
          let li = document.createElement("li");
          console.log(action);
          let text = document.createTextNode(action.name + ": " + action.desc);
          li.appendChild(text);
          document.getElementById("monsterActions").appendChild(li);
        });

        let speeds = monsterDetails.speed;
        setSpeedInfo(speeds);
        if (speeds == undefined) {
          return "";
        }
        console.log("speed", speeds);
        let speedList = document.createElement("p");
        for (var key in speeds) {
          console.log("inside speed loop", key, speeds[key]);
          let speed = document.createTextNode(
            " " + key + ": " + speeds[key] + " |"
          );
          speedList.appendChild(speed);
          document.getElementById("speedList").appendChild(speedList);
        }
        document.getElementById("monsterPage").style.height = "fit-content";
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  function generateMonster() {
    document.getElementById("monsterDetails").style.display = "flex";
    document.getElementById("monsterActions").innerHTML = "";
    document.getElementById("speedList").innerHTML = "";
  }

  const fullMonsterCall = () => {
    generateMonster();
    getMonster();
  };

  return (
    <div id="monsterPage">
      <div className="monsters">
        <h3>Monster Page</h3>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "175px",
              marginBottom: "2%",
              marginLeft: "2%",
            }}
            onClick={fullMonsterCall}
          >
            Get Monster
            <a>
              <FontAwesomeIcon
                icon={faSkull}
                style={{ color: "white", marginLeft: "7px" }}
              />
            </a>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg homeButton"
            id="homeButton"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "175px",
              marginBottom: "2%",
              marginRight: "2%",
            }}
            onClick={navHome}
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
      </div>
      <div
        className="monsterDetails"
        id="monsterDetails"
        style={{ display: "none" }}
      >
        <h1>{monsterData.name}</h1>

        <div className="monsterGroups">
          <div className="monsterGroup1">
            <div className="monsterImage">
              <img src={monsterImage}></img>
            </div>
            <div className="fullStats">
              <div className="boringStats">
                <h3>Monster Info</h3>
                <p>Type: {monsterData.type}</p>
                <p>Language: {monsterData.languages}</p>
                <p>Alignment: {monsterData.alignment}</p>
                <p>Hit Points: {monsterData.hit_points}</p>
              </div>
              <div className="monsterStats">
                <h3>Stats</h3>
                <ul>
                  <li>Str: {monsterData.strength}</li>
                  <li>Dex: {monsterData.dexterity}</li>
                  <li>Con: {monsterData.constitution}</li>
                  <li>Int: {monsterData.intelligence}</li>
                  <li>Wis: {monsterData.wisdom}</li>
                  <li>Char: {monsterData.charisma}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="monsterGroup2">
            <p>{monsterData.desc}</p>

            <div className="speedList">
              <h4>Speed: &nbsp;</h4>
              <div id="speedList"></div>
            </div>
            <div id="armorType">
              <h4>Armor Class: &nbsp;</h4>
              <p>
                {armorStats[0]} {armorStats[1]}
              </p>
            </div>

            <h3>Actions</h3>
            <div id="monsterActions"></div>
          </div>
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
          onClick={fullMonsterCall}
        >
          Don't Like It
          <a>
            <FontAwesomeIcon
              icon={faSkull}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Monsters;
