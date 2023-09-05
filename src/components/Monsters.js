import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { monsterList } from "../api/MonsterList";

import "./Components.css";
import { act } from "@testing-library/react";

function Monsters() {
  let [monsterData, setMonsterData] = useState([]);
  let [monsterImage, setMonsterImage] = useState("");
  // let armorType;

  const baseURL = "https://www.dnd5eapi.co/api/monsters/";
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const initialState = {
    
  }

  const getMonster = () => {
    generateMonster();
    // if(monsterData.length > 0){
    //   monsterData = ""
    // }
    const monsterIndex = randomNumber(0, 40);
    const ourMonster = monsterList[monsterIndex].index;
    setMonsterImage(monsterList[monsterIndex].img);
    axios
      .get(baseURL + ourMonster)
      .then((res) => {
        let monsterDetails = res.data;
        // console.log(monsterDetails)
        setMonsterData(monsterDetails);
        console.log("description", monsterDetails.desc)

        // console.log(action.name)

        let armorClass = monsterDetails.armor_class;
        getArmor(armorClass);

        let actions = monsterDetails.actions;
        getActions(actions);
        let speed = monsterDetails.speed;
        getSpeed(speed);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  const getActions = (actions) => {
    console.log(actions)
    if(actions == undefined){
      return ""
    }
    actions.forEach((action) => {
      let li = document.createElement("li");
      console.log(action);
      let text = document.createTextNode(action.name + ": " + action.desc);
      li.appendChild(text);
      document.getElementById("monsterActions").appendChild(li);
    });
  };

  const getArmor = (armorClass) => {
    // let para = document.createElement('p')
    console.log(armorClass)
    if(armorClass == undefined){
      return ""
    }
    let text = document.createElement("p");
    if (armorClass[0].armor !== undefined) {
      console.log("inside if", armorClass[0].armor[0].name);
      let armorType = armorClass[0].armor[0].name;
      let armorValue = armorClass[0].value;

      text = document.createTextNode("Armor Type: " + armorType + " " + armorValue);
    } else {
      console.log("inside else");
      console.log(armorClass[0].type);
      let naturalArmor = armorClass[0].type;
      let naturalValue = armorClass[0].value
      text = document.createTextNode("Armor Type: " + naturalArmor + " " + naturalValue);
    }
    // console.log('final type', armorType)
    // return armorType
    // innerHTML("Armor:" + text)
    document.getElementById("armorType").appendChild(text);
  };

  const getSpeed = (speedy) => {
    if(speedy == undefined){
      return ""
    }
    console.log("speed", speedy);
    let speedList = document.createElement("p");
    for (var key in speedy) {
      console.log(key, speedy[key]);
      let speed = document.createTextNode(key + ": " + speedy[key] + " | ");
      speedList.appendChild(speed);
      document.getElementById("speedList").appendChild(speedList);
    }
  };
  function generateMonster() {
    // let newCharName
    document.getElementById("monsterDetails").style.display = "flex";
    // console.log(newCharList[newCharIndex])
    // return newCharName
  }

  const resetMonster = () => {
    monsterData = useState(initialState)
    getActions(monsterData.actions)
    getArmor(monsterData.armor_class)
    getSpeed(monsterData.speed)
  }

  const refreshPage = () => {

    window.location.reload(false)
    // document.getElementById("monsterDetails").style.display = "none";

  }
  const callRefresh = () => {
    resetMonster()
    getMonster()
  }

  return (
    <div className="monsterPage">
      <div className="monsters">
        <h3>Monster Page</h3>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={getMonster}
        >
          Get Monster
          <a>
            <FontAwesomeIcon
              icon={faSkull}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
       
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
        <div className="monsterStats">
            <div id="monsterSpeed">
              {/* <p>{monsterData.speed.toString()}</p> */}
            </div>
            <p>{monsterData.desc}</p>
            <p>Type: {monsterData.type}</p>
            <p>Language: {monsterData.languages}</p>
            <p>Alignment: {monsterData.alignment}</p>
            <p>Hit Points: {monsterData.hit_points}</p>
            <h3>Speed</h3>
            <div id="speedList"></div>
            <div id="armorType"></div>
            </div>
          </div>

          <div className="monsterGroup2">
            <h3>Actions</h3>
            <div id="monsterActions"></div>
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
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={callRefresh}
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
