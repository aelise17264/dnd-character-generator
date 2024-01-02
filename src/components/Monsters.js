import axios from "axios";
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSkull,
  faHouseCrack,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { monsterList } from "../api/MonsterList";
import Footer from "./Footer";

import "./Components.css";

function Monsters() {
  let [monsterData, setMonsterData] = useState([]);
  let [monsterImage, setMonsterImage] = useState("");
  const [armorStats, setArmorClass] = useState([]);

  const baseURL = "https://www.dnd5eapi.co/api/monsters/";
  let navigate = useNavigate();
  const navHome = () => navigate("/", { replace: true });

  const modalRef = useRef();
  const showModal = () => {
    const modalEl = modalRef.current;
    const bsModal = new Modal(modalEl, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEl = modalRef.current;
    const bsModal = Modal.getInstance(modalEl);
    bsModal.hide();
  };

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getMonster = () => {
    generateMonster();
    const monsterIndex = randomNumber(0, 40);
    const ourMonster = monsterList[monsterIndex].index;
    setMonsterImage(monsterList[monsterIndex].img);
    axios
      .get(baseURL + ourMonster)
      .then((res) => {
        let monsterDetails = res.data;
        setMonsterData(monsterDetails);

        let armorClass = monsterDetails.armor_class;
        if (armorClass === undefined) {
          return "";
        }
        if (armorClass[0].armor !== undefined) {
          let armorType = armorClass[0].armor[0].name;
          let armorValue = armorClass[0].value;
          setArmorClass([armorType, armorValue]);
        } else {
          let naturalArmor = armorClass[0].type;
          let naturalValue = armorClass[0].value;
          setArmorClass([naturalArmor, naturalValue]);
        }

        let actions = monsterDetails.actions;
        if (actions === undefined) {
          return "";
        }
        actions.forEach((action) => {
          let li = document.createElement("li");
          let text = document.createTextNode(action.name + ": " + action.desc);
          li.appendChild(text);
          document.getElementById("monsterActions").appendChild(li);
        });

        let speeds = monsterDetails.speed;
        if (speeds === undefined) {
          return "";
        }
        let speedList = document.createElement("p");
        for (var key in speeds) {
          let speed = document.createTextNode(
            " " + key + ": " + speeds[key] + " |"
          );
          speedList.appendChild(speed);
          document.getElementById("speedList").appendChild(speedList);
        }
        document.getElementById("monsterPage").style.height = "100%";
      })
      .catch((err) => {
        console.error("something went wrong", err);
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
        <div
          className="buttons navbar"
          style={{ width: "90vw", marginLeft: "4%" }}
        >
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{
                width: "225px",
              }}
              onClick={showModal}
            >
              <a>
                <FontAwesomeIcon
                  icon={faQuestion}
                  style={{ color: "white", marginLeft: "7px" }}
                />
              </a>
              How to Use this Page
            </button>
          </div>
          <div className="monsterTitle">
            <h1>Monsters and Foes</h1>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg homeButton"
              id="homeButton"
              style={{
                width: "150px",
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
          className="modal fade"
          ref={modalRef}
          id="explainerModal"
          tabIndex="-1"
          aria-labelledby="explainerModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{ fontFamily: "Recursive, sans-serif" }}
            >
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  style={{ fontWeight: "bold" }}
                  id="explainerModal"
                >
                  Danger Around Every Corner
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={hideModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  This page will generate a random monster appropriate for your
                  level 1 party to face. If the particular foe does not meet
                  your expectations click the Reroll button at the bottom of the
                  page. The bulk of the monster stats and information will
                  appear when you click the Get Monster button. For more in dept
                  info consult the Monster Maunal
                </p>
                <a
                  target="_blank"
                  href="https://dnd.wizards.com/products/monster-manual"
                  rel="noreferrer"
                >
                  <img
                    className="modalImage"
                    alt="Monster Manual"
                    src="https://cdn.shoplightspeed.com/shops/614933/files/31478762/1600x2048x2/d-d-5e-monster-manual.jpg"
                  />
                </a>
                <h6
                  style={{
                    fontFamily: "Recursive, sans-serif",
                    fontStyle: "italic",
                    marginTop: "5%",
                    color: "#282c34",
                  }}
                >
                  Remember when you click "Back Home" your monster's info will
                  be cleared
                </h6>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={hideModal}
                >
                  Prepare for Battle
                </button>
              </div>
            </div>
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
                <img alt="Monster of choice" src={monsterImage}></img>
              </div>
              <div className="fullStats">
                <div className="boringStats">
                  <h3>Monster Info</h3>
                  <p>Type: {monsterData.type}</p>
                  <p>Language: {monsterData.languages}</p>
                  <p>Alignment: {monsterData.alignment}</p>
                  <p style={{ fontWeight: "bold" }}>
                    *Hit Points: {monsterData.hit_points}
                  </p>
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
              <div className="monsterDesc">
                <p>{monsterData.desc}</p>
              </div>
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
          {/* <div className="reroll">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={fullMonsterCall}
              style={{
                backgroundColor: "#282c34",
                border: "none",
                fontFamily: "MedievalSharp, cursive",
                fontSize: "medium",
                marginBottom: "2%",
                width: "175px",
              }}
            >
              Roll Again
              <a>
                <FontAwesomeIcon
                  icon={faSkull}
                  style={{ color: "white", marginLeft: "7px" }}
                />
              </a>
            </button>
          </div> */}
        </div>
        <div className="buttons monsterButton">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              width: "150px",
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Monsters;
