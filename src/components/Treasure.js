import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faHouseCrack } from "@fortawesome/free-solid-svg-icons";

import "./Components.css";

function Treasure() {
  let navigate = useNavigate();
  const navHome = () => navigate("/", { replace: true });

  const baseURL = "https://www.dnd5eapi.co/api";

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
    let errorMessage = document.getElementById("errorMessage");
    if (partySize == "" || partySkill == "" || partyFavor == "") {
      errorMessage.innerText = "Oops you forgot something";
    } else if (partySize <= 0) {
      errorMessage.innerText =
        "Are you playing with ghosts? Check your party size";
    } else {
      errorMessage.innerText = "";
      document.getElementById("dropDowns").style.display = "none";
      document.getElementById("lootList").style.display = "block";
      setGoldCount(partySize);
      itemsFound(partySize, partySkill);
      getMagic(partyFavor);
      document.getElementById("treasurePage").style.height = "fit-content";
    }
  };

  const setGoldCount = (count) => {
    document.getElementById("goldCount").innerHTML = "Gold: " + count * 100;
  };

  const itemsFound = (count, skill) => {
    const equipmentFound = document.getElementById("equipmentFound");
    const weaponsFound = document.getElementById("weaponsFound");
    const gearFound = document.getElementById("gearFound");

    axios
      .get(baseURL + `/equipment-categories/standard-gear`)
      .then((res) => {
        let equiList = res.data.equipment;
        for (var i = 0; i < count; i++) {
          const numOfEqui = randomNumber(0, 94);
          let equi = equiList[numOfEqui].name;
          let equiLi = document.createElement("li");
          equiLi.textContent = equi;
          equiLi.value = equi;
          equipmentFound.appendChild(equiLi);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (skill > 1) {
      axios
        .get(baseURL + `/equipment-categories/weapon`)
        .then((res) => {
          let weaponList = res.data.equipment;

          for (var i = 0; i < count; i++) {
            const numOfWeapon = randomNumber(0, 63);
            let weapon = weaponList[numOfWeapon].name;
            let weaponLi = document.createElement("li");
            weaponLi.textContent = weapon;
            weaponLi.value = weapon;
            weaponsFound.appendChild(weaponLi);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (skill == 3) {
      axios
        .get(baseURL + `/equipment-categories/adventuring-gear`)
        .then((res) => {
          let gearList = res.data.equipment;

          for (var i = 0; i < count; i++) {
            const numOfGear = randomNumber(0, 116);
            let gear = gearList[numOfGear].name;
            let gearLi = document.createElement("li");
            gearLi.textContent = gear;
            gearLi.value = gear;
            gearFound.appendChild(gearLi);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getMagic = (likeability) => {
    const magicFound = document.getElementById("magicFound");
    if (likeability == 1) {
      axios
        .get(baseURL + `/equipment-categories/medium-armor`)
        .then((res) => {
          let armorList = res.data.equipment;
          let armorNum = randomNumber(0, 5);
          magicFound.innerText = "Armor: " + armorList[armorNum].name;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (likeability == 2) {
      axios
        .get(baseURL + `/magic-items`)
        .then((res) => {
          let magicList = res.data.results;
          let magicNum = randomNumber(5, 362);
          magicFound.innerText = "Magical Item: " + magicList[magicNum].name;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(baseURL + `/equipment-categories/wondrous-items`)
        .then((res) => {
          let wondrousList = res.data.equipment;
          let wonderousNum = randomNumber(0, 177);
          magicFound.innerText =
            "Wondrous Item: " + wondrousList[wonderousNum].name;
        });
    }
  };

  const refreshTreasure = () => {
    document.getElementById("dropDowns").style.display = "flex";
    document.getElementById("lootList").style.display = "none";
    document.getElementById("partySize").value = "";
    document.getElementById("skillLevel").value = "";
    document.getElementById("likeability").value = "";
    document.getElementById("equipmentFound").innerHTML = "";
    document.getElementById("weaponsFound").innerHTML = "";
    document.getElementById("gearFound").innerHTML = "";
    document.getElementById("magicFound").innerText = "";
    document.getElementById("treasurePage").style.height = "100vh";

    partySize = "";
    partySkill = "";
    partyFavor = "";
  };

  return (
    <div className="treasurePage" id="treasurePage">
      <div className="treasure">
        <h3>Treasure Page</h3>
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
          <select
            id="skillLevel"
            className="form-select bg-transparent"
            name="skillLevel"
          >
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
        <h1 id="errorMessage"></h1>
      </div>
      <div className="lootList" id="lootList" style={{ display: "none" }}>
        <div className="equipment">
          <div className="oneForAll">
            <h3>Equipment</h3>
            <div id="equipmentFound"></div>
            <div id="weaponsFound"></div>
            <div id="gearFound"></div>
          </div>
          <div className="goldandMagic">
            <h3 id="goldCount"></h3>
            <h3 id="magicFound"></h3>
            <img src="https://www.dndbeyond.com/avatars/thumbnails/7/122/1000/1000/636284708338172704.jpeg" />
          </div>
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
    </div>
  );
}

export default Treasure;
