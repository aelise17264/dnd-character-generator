// import "../App.css";
import "../Components.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import Select from "react-select";
import Async, { useAsync } from "react-select/async";
import { ReactDOM } from "react-dom";
import useLocalStorage from "use-local-storage";
import { nameList } from "../../api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import {
  faDiceD20,
  faRightLong,
  faHouseCrack,
  faEraser,
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
    axios
      .get(baseURL + `/features`)
      .then((res) => {
        let featureList = res.data.results;

        for (var i = 0; i <= featureList.length; i++) {
          let feat = featureList[i].index;
          let featOpt = document.createElement("option");
          featOpt.textContent = feat;
          featOpt.value = feat;
          featuresData.appendChild(featOpt);
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

  return (
    <div className="character" id="character">
      <div className="buttons">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "220px",
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
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "220px",
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
        <h3>
          If everything looks good click the arrow to get your stats. If not
          roll again
        </h3>

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
