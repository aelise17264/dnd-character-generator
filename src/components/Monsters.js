import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { monsterList } from "../api/MonsterList";

import "./Components.css";

function Monsters() {
  const [monsterData, setMonsterData] = useState([]);

  const baseURL = "https://www.dnd5eapi.co/api/monsters/";
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const getMonster = () => {
    const monsterIndex = randomNumber(1, 40);
    const ourMonster = monsterList[monsterIndex];
    axios
      .get(baseURL + ourMonster)
      .then((res) => {
        let monsterDetails = res.data;
        // console.log(monsterDetails)
        setMonsterData(monsterDetails);

        // console.log(action.name)
        let actions = monsterDetails.actions;
        getActions(actions);
        let speed = monsterDetails.speed
        getSpeed(speed)
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  const getActions = (actions) => {
    actions.forEach((action) => {
      let li = document.createElement("li");
      console.log(action);
      let text = document.createTextNode(action.name + ": " + action.desc)
      li.appendChild(text);
      document.getElementById("monsterActions").appendChild(li);
    });
  };

const getSpeed = (speedy) => {
  console.log('speed', speedy)
  // let speedString = JSON.stringify(speedy)
  // document.getElementById("monsterSpeed").innerHTML = speedString
//   const speedArray = Object.values(speedy)
//   console.log(speedArray)
//  JSON.stringify(speedArray).replace(/]|[[]/g, '')


  // let fast = "";
  // for(let x in speedy){
  //   fast += speedy[x] + " ";
  // }
  // document.getElementById("monsterSpeed").innerHTML = fast
  // const ul = document.getElementById("monsterSpeed")
  // let li = document.createElement("li");
  // console.log('array', speedArray)
  // speedArray.forEach((motion) =>{
  //   let text = document.createTextNode(speedArray.index + motion)
  //   li.appendChild(text)
  //   document.getElementById("monsterSpeed").appendChild(li)

  // })
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
      <div className="monsterDetails">
        <h2>{monsterData.name}</h2>
        <div id="monsterSpeed">
          {/* <p>{monsterData.speed.toString()}</p> */}
        </div>
        <p>{monsterData.desc}</p>
        <p>Type: {monsterData.type}</p>
        <p>Language: {monsterData.languages}</p>
        <p>Alignment: {monsterData.alignment}</p>
        <p>Hit Points: {monsterData.hit_points}</p>
        <img src={monsterData.image}></img>
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
  );
}

export default Monsters;
