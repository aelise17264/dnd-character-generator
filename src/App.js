import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Stats from "./Stats";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { nameList } from "./NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import { faDiceD20, faRightLong } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [nameData, setNameData] = useState("");
  const [alignmentData, setAlignmentData] = useState("");
  const [classData, setClassData] = useState("");
  const [traitData, setTraitsData] = useState([]);
  const [featuresData, setFeaturesData] = useState("");
  const [languageData, setLanguageData] = useState("");
  const [equipmentData, setEquipmentData] = useState("");
  const [armorData, setArmorData] = useState("");

  const baseURL = "https://www.dnd5eapi.co/api/";

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getCharName = () => {
    axios
      .get(baseURL + `/races`)
      .then((res) => {
        let newCharList = res.data.results;
        let newCharIndex = Math.floor(Math.random() * 10);
        setNameData(newCharList[newCharIndex].name);
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(error);
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
        console.log(error);
      });
  };

  const getTraits = () => {
    axios
      .get(baseURL + `/traits`)
      .then((res) => {
        let traitList = res.data.results;
        let firstTraitIndex = randomNumber(1, 38);
        let secondTraitIndex = randomNumber(1, 38);
        setTraitsData([
          traitList[firstTraitIndex].name,
          traitList[secondTraitIndex].name,
        ]);
      })
      .catch((error) => {
        console.log(error);
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
        console.log(error);
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
  const getFeature = () => {
    axios.get(baseURL + `/features`).then((res) => {
      let featureList = res.data.results;
      let featureIndex = randomNumber(1, 370);
      setFeaturesData(featureList[featureIndex].name);
    });
  };

  const createCharacter = () => {
    getAlignment();
    getCharName();
    getClass();
    getTraits();
    getLanguages();
    getEquipment();
    getArmor();
    getFeature();
    // getNameList();
  };

  useEffect(() => {
    createCharacter();
  }, []);

  let navigate = useNavigate();
  const handleArrowClick = () => navigate("/Stats", { replace: true });

  // const navToStats = () => {
  //   let path = `stats`;
  //   navigate(path)
  // }
  const possibleNames = nameList[nameData];
  const getNameList = possibleNames?.map((name) => {
    return <li id="name">{name}</li>;
  });

  return (
    <div className="App">
      <Header />
      <div className="generate">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#282c34", border: "none", width: "220px" }}
          onClick={generateCharacter}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Character
        </button>
      </div>
      <div id="hideForm">
        <div className="topForm">
          <div className="characterVisual">
            <img id="dice" className={nameData} />
            <div className="names">
              <label>Possible Names</label>
              <ul id="listOfNames"></ul>
              {getNameList}
            </div>
          </div>
          <form>
            <div className="form-group">
              <h2>Alignment</h2>
              <h3>{alignmentData}</h3>
              {/* <input className="form-control"/> */}
            </div>
            <div className="form-group">
              <h2>Class</h2>
              <h3 id="classType">{classData}</h3>
              {/* <input type="text" className="form-control" placeholder="" value="$newCharName" /> */}
            </div>
            <div className="form-group">
              <h2>Race</h2>
              <h3 id="charName">{nameData}</h3>
            </div>
            <div className="form-group">
              <h2>Random Traits</h2>
              <ul>
                <li>{traitData[0]}</li>
                <li>{traitData[1]}</li>
              </ul>
            </div>
            <div className="form-group">
              <h2>Languages</h2>
              <ul>
                <li>{languageData[0]}</li>
                <li>{languageData[1]}</li>
              </ul>
            </div>
            <div className="form-group">
              <h2>Equipment</h2>
              <ul>
                <li>{equipmentData[0]}</li>
                <li>{equipmentData[1]}</li>
                <li>{equipmentData[2]}</li>
              </ul>
            </div>
            <div className="form-group">
              <h2>Armor</h2>
              <p>{armorData}</p>
            </div>
            <div className="form-group">
              <h2>Special Feature</h2>
              <p>{featuresData}</p>
            </div>
          </form>
        </div>
        <div className="refresh">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ backgroundColor: "#282c34", border: "none" }}
            onClick={createCharacter}
            id="reroll"
          >
            Roll Again
          </button>

          <h3>
            If everything looks good click the arrow to get your stats. If not
            roll again
          </h3>
          <a id="arrow">
            <FontAwesomeIcon
              icon={faRightLong}
              size="2xl"
              style={{ color: "#282c34" }}
              onClick={handleArrowClick}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;

const abilityStats = [15, 14, 13, 12, 10, 8];
const basicPerception = 10;
// let showChar = 'hidden'
// Attack modifiers
// const attackRange = dex + profModifier
// const attackBasicRange = dex
// const attackMele = strength + profModifier
// const attackBasicMele = strength

// armor class

// let [responseName, setResponseName] = React.useState('')

function generateCharacter() {
  // let newCharName
  document.getElementById("hideForm").style.display = "block";
  // console.log(newCharList[newCharIndex])
  // return newCharName
}
