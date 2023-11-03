// import "../App.css";
import "../Components.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import useLocalStorage from "use-local-storage";
import { nameList } from "../../api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceD20,
  faRightLong,
  faHouseCrack,
  faEraser,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

function Character() {
  const [nameData, setNameData] = useLocalStorage("name", "");
  const [alignmentData, setAlignmentData] = useLocalStorage("alignment", "");
  const [classData, setClassData] = useLocalStorage("class", "");
  const [traitData, setTraitsData] = useLocalStorage("traits", []);
  const [featuresData, setFeaturesData] = useLocalStorage("feature", "");
  const [languageData, setLanguageData] = useLocalStorage("language", "");
  const [equipmentData, setEquipmentData] = useLocalStorage("equipment", "");
  const [armorData, setArmorData] = useLocalStorage("armor", "");

  const baseURL = "https://www.dnd5eapi.co/api/";

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getCharName = () => {
    console.log("get char name");
    axios
      .get(baseURL + `/races`)
      .then((res) => {
        let newCharList = res.data.results;
        console.log("race", newCharList);
        let newCharIndex = Math.floor(Math.random() * 10);
        setNameData(newCharList[newCharIndex].name);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("inside name call", nameData);
  };

  const getAlignment = () => {
    axios
      .get(baseURL + `/alignments`)
      .then((res) => {
        let alignmentList = res.data.results;
        let alignmentIndex = Math.floor(Math.random() * 10);
        setAlignmentData(alignmentList[alignmentIndex].name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getClass = () => {
    axios
      .get(baseURL + `classes`)
      .then((res) => {
        let classList = res.data.results;
        let classIndex = randomNumber(1, 12);
        setClassData(classList[classIndex].name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLanguages = () => {
    axios
      .get(baseURL + `/languages`)
      .then((res) => {
        let languageList = res.data.results;
        let firstLanguageIndex = 2;
        let secondLanguageIndex = randomNumber(1, 16);
        if (secondLanguageIndex === firstLanguageIndex) {
          secondLanguageIndex = randomNumber(1, 16);
        }
        setLanguageData([
          languageList[firstLanguageIndex].name,
          languageList[secondLanguageIndex].name,
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getEquipment = () => {
    axios.get(baseURL + `/equipment`).then((res) => {
      let equipmentList = res.data.results;
      let firstPieceIndex = randomNumber(1, 237);
      let secondPieceIndex = randomNumber(1, 237);
      let thirdPieceIndex = randomNumber(1, 237);
      setEquipmentData([
        equipmentList[firstPieceIndex].name,
        equipmentList[secondPieceIndex].name,
        equipmentList[thirdPieceIndex].name,
      ]);
    });
  };

  const getArmor = () => {
    axios.get(baseURL + `/equipment-categories/armor`).then((res) => {
      let armorList = res.data.equipment;
      let armorLevel = randomNumber(1, 3);
      setArmorData(armorList[armorLevel].name);
    });
  };

  const getTraits = () => {
    axios
      .get(baseURL + `/traits`)
      .then((res) => {
        let traitList = res.data.results;
        let traitSelect1 = document.getElementById("Rtrait1");
        for (var i = 0; i <= 39; i++) {
          let trait = traitList[i].name;
          let opt = document.createElement("option");
          opt.textContent = trait;
          opt.value = trait;
          traitSelect1.appendChild(opt);
          // traitSelect2.appendChild(opt);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTrait1 = (e) => {
    let newTrait = e.target.value;
    // traitData.unshift(newTrait)
    // traitData = traitData.slice(0, 1)
    setTraitsData([newTrait, ...traitData.slice(0, 1)]);
    // e.target.option.style = {"backgroundColor": "blue"}
    // displaySecondTraitList();
  };

  const getFeature = () => {
    console.log("call features");
    axios
      .get(baseURL + `/features`)
      .then((res) => {
        console.log("get features");
        let featureList = res.data.results;
        let displayFeatures = document.getElementById("features");
        for (var i = 0; i <= featureList.length; i++) {
          let feat = featureList[i].index;
          let featOpt = document.createElement("option");
          featOpt.textContent = feat;
          featOpt.value = feat;
          displayFeatures.appendChild(featOpt);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setFeature = (e) => {
    let newFeature = e.target.value;
    setFeaturesData(newFeature.replace(/-/g, " "));
  };

  useEffect(() => {
    getFeature();
    getTraits();
  }, []);

  const createCharacter = () => {
    // generateCharacter();
    getAlignment();
    getCharName();
    getClass();
    // getTraits();
    getLanguages();
    getEquipment();
    getArmor();
    // getFeature();
  };

  const reRollChar = () => {
    const charError = document.getElementById("charError");
    charError.innerText = "";
    setFeaturesData("");
    setTraitsData(["", ""]);
    // getFeature()
    // getTraits()
    // generateCharacter();
    getAlignment();
    getCharName();
    getClass();
    getLanguages();
    getEquipment();
    getArmor();
  };

  let navigate = useNavigate();
  const handleArrowClick = () => {
    if ((traitData == []) | (featuresData == "")) {
      const charError = document.getElementById("charError");
      charError.innerText =
        "Make sure you've selected all your character traits and features";
    } else {
      navigate("/Stats", {
        replace: true,
        state: {
          nameData,
          classData,
          alignmentData,
          traitData,
          featuresData,
          languageData,
          equipmentData,
          armorData,
        },
      });
    }
  };

  const clearSheet = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navHome = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const possibleNames = nameList[nameData];
  const getNameList = possibleNames?.map((name) => {
    return <li className="name">{name}</li>;
  });

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
    <div className="character" id="character">
      <div className="buttons navbar">
        <div>
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
            onClick={showModal}
          >
            <a>
              <FontAwesomeIcon
                icon={faQuestion}
                style={{ color: "white", marginRight: "4px" }}
              />
            </a>
            How to Use
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "250px",
              marginBottom: "2%",
              marginLeft: "1%",
            }}
            onClick={createCharacter}
            id="reroll"
          >
            <a>
              <FontAwesomeIcon
                icon={faDiceD20}
                style={{ color: "white", marginRight: "5px" }}
              />
            </a>
            Roll for Character
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "265px",
              marginBottom: "2%",
              marginLeft: "1%",
            }}
            onClick={clearSheet}
          >
            <a>
              <FontAwesomeIcon
                icon={faEraser}
                style={{ color: "white", marginRight: "5px" }}
              />
            </a>
            Clear Character Sheet
          </button>
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
                Ready for Adventure
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <p>Welcome to the Random Character Builder!</p>
              <h6 style={{
                  fontFamily: "Recursive, sans-serif",
                  fontStyle: "italic",
                }}>
                Before you start keep in mind moving between pages within the
                character builder section will not lose any of your character
                info BUT clicking "Back Home" will clear your sheet and your
                character will be lost to the sands of time.
              </h6>
              <p>
                This section will generate everything you need for a chaotically created Level 1
                character (according to 5e rules). Click "Roll for Character" to
                populate the form below. If you don't care for your character
                click "Roll Again" at the bottom of the form. Once the basics
                have been filled in, you can select two (2) Random Traits and
                one (1) Special Feature. When you're happy with the form on this
                page click the arrow at the bottom of the page to roll for your
                stats.
              </p>
          <a>
                <img
                  className="heroModal"
                  src="https://assetsio.reedpopcdn.com/explorers-guide-to-wildemount-dungeons-and-dragons-tabletop-roleplaying-game-image-2.jpg?width=660&quality=80&format=jpg&auto=webp"
                />
              </a>
 
              <h6
                style={{
                  fontFamily: "Recursive, sans-serif",
                  fontStyle: "italic",
                }}
              >
                Note: Your final character page made in this generator works best as
                a companion to an official character sheet.
              </h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={hideModal}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="characterHeader">
        <h1>Character Builder</h1>
      </div>
      <div className="wholeForm">
        <div className="topForm">
          <div className="characterVisual">
            <div id="dice" className={nameData} />
            <div className="names">
              <label>Possible Names</label>
              <ul id="listOfNames"></ul>
              {getNameList}
            </div>
          </div>
          <form>
            <div className="form-group">
              <h2>Alignment: {alignmentData}</h2>
            </div>
            <div className="form-group">
              <h2>Class: {classData}</h2>
            </div>
            <div className="form-group">
              <h2>Race: {nameData}</h2>
            </div>
            <div>
              <h2>Armor: {armorData}</h2>
            </div>
            <div>
              <h2>Languages</h2>
              <ul>
                <li>{languageData[0]}</li>
                <li>{languageData[1]}</li>
              </ul>
            </div>
            <div>
              <h2>Equipment</h2>
              <ul>
                <li>{equipmentData[0]}</li>
                <li>{equipmentData[1]}</li>
                <li>{equipmentData[2]}</li>
              </ul>
            </div>
            <div className="traits">
              <label for="randomTraits">Random Traits: Pick 2</label>
              <select
                class="form-select"
                multiple
                aria-label="multiple select example"
                name="randomTraits"
                id="Rtrait1"
                onChange={changeTrait1}
                value={traitData}
              >
                <option value="">Select Trait</option>
              </select>
              <div className="traitData">
                <p>{traitData[0]}</p>
                <p>{traitData[1]}</p>
              </div>
            </div>
            <div className="features">
              <label for="specialFeature">Special Feature: Pick 1 </label>
              <select
                className="form-select"
                name="specialFeature"
                id="features"
                onChange={setFeature}
                value={featuresData}
              >
                <option value="">Select Special Feature</option>
              </select>
              <div className="featuresData">
                <p>{featuresData}</p>
              </div>
            </div>
          </form>
        </div>

        <div className="buttonHolder">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ backgroundColor: "#282c34", border: "none" }}
            onClick={reRollChar}
            id="reroll"
          >
            Roll Again
          </button>
        </div>
        <a id="charError" />
      </div>
      <div className="refresh">
        <h3>To Stats & Spells</h3>

        <a id="arrow">
          <FontAwesomeIcon
            icon={faRightLong}
            size="2xl"
            style={{ color: "white" }}
            onClick={handleArrowClick}
          />
        </a>
      </div>
    </div>
  );
}

export default Character;
