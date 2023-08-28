import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Stats from "./components/Stats";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { nameList } from "./api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import { faDiceD20, faRightLong } from "@fortawesome/free-solid-svg-icons";

function App() {
  // const [nameData, setNameData] = useState("");
  // const [alignmentData, setAlignmentData] = useState("");
  // const [classData, setClassData] = useState("");
  // const [traitData, setTraitsData] = useState([]);
  // const [featuresData, setFeaturesData] = useState("");
  // const [languageData, setLanguageData] = useState("");
  // const [equipmentData, setEquipmentData] = useState("");
  // const [armorData, setArmorData] = useState("");

  // const baseURL = "https://www.dnd5eapi.co/api/";

  // function randomNumber(min, max) {
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  // const getCharName = () => {
  //   axios
  //     .get(baseURL + `/races`)
  //     .then((res) => {
  //       let newCharList = res.data.results;
  //       let newCharIndex = Math.floor(Math.random() * 10);
  //       setNameData(newCharList[newCharIndex].name);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getAlignment = () => {
  //   axios
  //     .get(baseURL + `/alignments`)
  //     .then((res) => {
  //       let alignmentList = res.data.results;
  //       let alignmentIndex = Math.floor(Math.random() * 10);
  //       setAlignmentData(alignmentList[alignmentIndex].name);
  //       console.log(nameData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getClass = () => {
  //   axios
  //     .get(baseURL + `classes`)
  //     .then((res) => {
  //       let classList = res.data.results;
  //       let classIndex = randomNumber(1, 12);
  //       setClassData(classList[classIndex].name);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getTraits = () => {
  //   axios
  //     .get(baseURL + `/traits`)
  //     .then((res) => {
  //       let traitList = res.data.results;
  //       let firstTraitIndex = randomNumber(1, 38);
  //       let secondTraitIndex = randomNumber(1, 38);
  //       setTraitsData([
  //         traitList[firstTraitIndex].name,
  //         traitList[secondTraitIndex].name,
  //       ]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getLanguages = () => {
  //   axios
  //     .get(baseURL + `/languages`)
  //     .then((res) => {
  //       let languageList = res.data.results;
  //       let firstLanguageIndex = 2;
  //       let secondLanguageIndex = randomNumber(1, 16);
  //       if (secondLanguageIndex === firstLanguageIndex) {
  //         secondLanguageIndex = randomNumber(1, 16);
  //       }
  //       setLanguageData([
  //         languageList[firstLanguageIndex].name,
  //         languageList[secondLanguageIndex].name,
  //       ]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getEquipment = () => {
  //   axios.get(baseURL + `/equipment`).then((res) => {
  //     let equipmentList = res.data.results;
  //     let firstPieceIndex = randomNumber(1, 237);
  //     let secondPieceIndex = randomNumber(1, 237);
  //     let thirdPieceIndex = randomNumber(1, 237);
  //     setEquipmentData([
  //       equipmentList[firstPieceIndex].name,
  //       equipmentList[secondPieceIndex].name,
  //       equipmentList[thirdPieceIndex].name,
  //     ]);
  //   });
  // };

  // const getArmor = () => {
  //   axios.get(baseURL + `/equipment-categories/armor`).then((res) => {
  //     let armorList = res.data.equipment;
  //     let armorLevel = randomNumber(1, 3);
  //     setArmorData(armorList[armorLevel].name);
  //   });
  // };
  // const getFeature = () => {
  //   axios.get(baseURL + `/features`).then((res) => {
  //     let featureList = res.data.results;
  //     let featureIndex = randomNumber(1, 370);
  //     setFeaturesData(featureList[featureIndex].name);
  //   });
  // };

  // const createCharacter = () => {
  //   getAlignment();
  //   getCharName();
  //   getClass();
  //   getTraits();
  //   getLanguages();
  //   getEquipment();
  //   getArmor();
  //   getFeature();
  //   // getNameList();
  // };

  // useEffect(() => {
  //   createCharacter();
  // }, []);

  // let navigate = useNavigate();
  // const handleArrowClick = () =>
  //   navigate("/Stats", { replace: true, state: { nameData } });

  // // const navToStats = () => {
  // //   let path = `stats`;
  // //   navigate(path)
  // // }
  // const possibleNames = nameList[nameData];
  // const getNameList = possibleNames?.map((name) => {
  //   console.log("get name list called");
  //   return <li className="name">{name}</li>;
  // });

  let navigate = useNavigate();
  const navToCharacter = () =>
    navigate("/Character", { replace: true });


  return (
    <div className="App">
      {/* <Header /> */}
     {/* <h2>This is now a landing page</h2> */}
     <div id="buffer"></div>
     <div className="scroll">
     <div className="welcome">
      <h2>Welcome Traveler</h2>
      <p>Planning a campaign? Need to throw together some NPCs quickly? Want your team to find some exciting treasure along the way?</p>
      <p>Roll the dice bellow for chaotic choices from each category.</p>
      <p>You can save or print the final product to take with you to your next campaign</p>
      </div>
     </div>
     <div className="button-row">
     <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#966919", border: "none", width: "220px" }}
          onClick={navToCharacter}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Character
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#6E260E", border: "none", width: "220px" }}
          onClick={generateCharacter}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Treasure
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#6F4E37", border: "none", width: "220px" }}
          onClick={generateCharacter}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Monster
        </button>
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
