import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faHouseCrack,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

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
    if (partySize === "" || partySkill === "" || partyFavor === "") {
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
      .get(baseURL + "/equipment-categories/standard-gear")
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
        console.error(error);
      });
    if (skill > 1) {
      axios
        .get(baseURL + "/equipment-categories/weapon")
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
          console.error(error);
        });
    }
    if (skill === 3) {
      axios
        .get(baseURL + "/equipment-categories/adventuring-gear")
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
          console.error(error);
        });
    }
  };

  const getMagic = (likeability) => {
    const magicFound = document.getElementById("magicFound");
    if (likeability === 1) {
      axios
        .get(baseURL + "/equipment-categories/medium-armor")
        .then((res) => {
          let armorList = res.data.equipment;
          let armorNum = randomNumber(0, 5);
          magicFound.innerText = "Armor: " + armorList[armorNum].name;
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (likeability === 2) {
      axios
        .get(baseURL + "/magic-items")
        .then((res) => {
          let magicList = res.data.results;
          let magicNum = randomNumber(5, 354);
          magicFound.innerText = "Magical Item: " + magicList[magicNum].name;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(baseURL + "/equipment-categories/wondrous-items")
        .then((res) => {
          let wondrousList = res.data.equipment;
          let wonderousNum = randomNumber(0, 177);
          magicFound.innerText =
            "Bonus Item: " + wondrousList[wonderousNum].name;
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

  return (
    <div className="treasurePage" id="treasurePage">
      <div className="buttons navbar">
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "250px",
              marginBottom: "2%",
            }}
            onClick={showModal}
          >
            <a>
              <FontAwesomeIcon icon={faQuestion} style={{ color: "white" }} />
            </a>
            How to Use this Page
          </button>
        </div>
        <div style={{ paddingRight: "5%" }}>
          <h1>Treasure & Equipment</h1>
        </div>
        <div>
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
                  Always loot the bodies
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
                  Your adventurers have stumbled upon some treasure. This random
                  generator will help you determine how many and what type of
                  items they have found.
                </p>
                <p>
                  {" "}
                  First enter the number of players in your party. Each player
                  will receive 100 gold pieces.
                </p>
                <p>
                  {" "}
                  Next decide how well your players are doing. Each player will
                  receive one (1) piece of standard equipment regardless of
                  skill level. If "they're learning", each player will receive
                  one (1) additional weapon. And if they're "true adventurers"
                  they will also receive one (1) piece of adventuring gear each.
                  You can divide up these pieces of equipment according to each
                  player's class and skill. Or you can randomly assign them if
                  you're feeling extra chaotic.
                </p>
                <p>
                  Lastly decide how much you like your players. If they've
                  annoyed you today and they're being "the worst" the party will
                  receive one (1) additional piece of armor. If they haven't
                  made you pull out your hair today ("they're ok") the party
                  will receive one (1) magical item. Did they bring you gifts?
                  Or at least not derail the campaign you planned out? If
                  they're "the best" the party will receive one (1) wonderous
                  item. You can dole out this extra item or you can let the
                  party decide who would use it best.
                </p>
                <a>
                  <img
                    alt="Treasure list"
                    className="treasureImage"
                    src="https://cdna.artstation.com/p/assets/images/images/052/334/312/large/xenia-pike-inventory-without-signature.jpg?1659533649"
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
                  Remember when you click "Back Home" your treasure list will be
                  cleared
                </h6>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={hideModal}
                >
                  Plunder!
                </button>
              </div>
            </div>
          </div>
        </div>
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
            opacity: "100%",
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
        <div id="errorMessage"></div>
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
            {/* eslint-disable-next-line */}
            <h3 id="goldCount"></h3>
            {/* eslint-disable-next-line */}
            <h3 id="magicFound"></h3>
            <img
              alt="Treasure Trove"
              src="https://p.kindpng.com/picc/s/209-2094624_treasure-roll20-hd-png-download.png"
            />
          </div>
        </div>
        <div className="refresh" style={{ marginTop: "2%" }}>
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
      <Footer />
    </div>
  );
}

export default Treasure;
