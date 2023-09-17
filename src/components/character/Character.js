// import "../App.css";
import "../Components.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { nameList } from "../../api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import { faDiceD20, faRightLong } from "@fortawesome/free-solid-svg-icons";

function Character() {
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
        // console.log(nameData);
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
        let traitSelect1 = document.getElementById("Rtrait1");
        for (var i = 0; i < traitList.length; i++) {
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

      let features = document.getElementById("features");
      for (var i = 0; i < featureList.length; i++) {
        let feat = featureList[i].index;
        let featOpt = document.createElement("option");
        featOpt.textContent = feat;
        featOpt.value = feat;
        features.appendChild(featOpt);
      }
      // let featureIndex = randomNumber(1, 370);
      // setFeaturesData(featureList[featureIndex].name);
    });
  };

  const setFeature = (e) => {
    // console.log("hopefully more than one", traitData);
    // let charFeature = e.target.value
    setFeaturesData({
      featuresData: e.target.value,
    });
  };
  //   console.log("feature", e.target.value)
  //   setFeature(charFeature);
  //   // console.log('set feature', e.target.value)
  // };

  const createCharacter = () => {
    generateCharacter();
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

  function generateCharacter() {
    // let newCharName
    document.getElementById("hideForm").style.display = "block";
    document.getElementById("character").style.height = "fit-content";
    // console.log(newCharList[newCharIndex])
    // return newCharName
  }

  const changeTrait1 = (e) => {
    console.log("changed");
    setTraitsData([e.target.value]);
    console.log(e.target.value);

    document.getElementById("Rtrait2").disabled = 0;
    displaySecondTraitList();
    //  console.log("second trait", traitList)
    // traitSelect2.setAttribute("disabled", " ");
  };

  const displaySecondTraitList = () => {
    console.log(traitData, "inside get");
    console.log(featuresData.featuresData, "feature?");

    axios
      .get(baseURL + `/traits`)
      .then((res) => {
        let traitList2 = res.data.results;
        console.log(traitList2);
        // let filteredTraitList = traitList2.filter(traitData);
        // console.log(filteredTraitList, "filtered list");
        let traitSelect2 = document.getElementById("Rtrait2");
        for (var i = 0; i < traitList2.length; i++) {
          let trait = traitList2[i].name;
          let opt = document.createElement("option");
          opt.textContent = trait;
          opt.value = trait;
          traitSelect2.appendChild(opt);
          // traitSelect2.appendChild(opt);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTrait2 = (e) => {
    console.log(featuresData);

    setTraitsData([...traitData, e.target.value]);
  };

  let navigate = useNavigate();
  const handleArrowClick = () =>
    navigate("/Stats", { replace: true, state: { nameData, classData } });

  const possibleNames = nameList[nameData];
  const getNameList = possibleNames?.map((name) => {
    // console.log("get name list called");
    return <li className="name">{name}</li>;
  });

  return (
    <div className="character" id="character">
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#282c34", border: "none" }}
          onClick={createCharacter}
          id="reroll"
        >
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
              <h2>Alignment: {alignmentData}</h2>
              {/* <h3 id="alignment">{alignmentData}</h3> */}
              {/* <input className="form-control"/> */}
            </div>
            <div className="form-group">
              <h2>Class: {classData}</h2>
              {/* <h3 id="classType">{classData}</h3> */}
              {/* <input type="text" className="form-control" placeholder="" value="$newCharName" /> */}
            </div>
            <div className="form-group">
              <h2>Race: {nameData}</h2>
              {/* <h3 id="charName">{nameData}</h3> */}
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
            <div>
              <h2>Armor</h2>
              <p>{armorData}</p>
            </div>
            <div className="traits">
              <label for="randomTraits">Random Traits</label>
              <select
                className="form-select"
                name="randomTraits"
                id="Rtrait1"
                onChange={changeTrait1}
              >
                <option value="">Select Trait</option>
              </select>
              <select
                disabled
                name="randomTraits"
                id="Rtrait2"
                onChange={changeTrait2}
                className="form-select"
              >
                <option>Select Trait</option>
              </select>
              {/* <ul>
                <li>{traitData[0]}</li>
                <li>{traitData[1]}</li>
              </ul> */}
            </div>
            <div className="features">
              <label for="specialFeature">Special Feature </label>
              <select
                className="form-select"
                name="specialFeature"
                id="features"
                onChange={setFeature}
              >
                <option value="">Select Special Feature</option>
                {/* <option value={featuresData}>{featuresData}</option> */}
              </select>

              {/* <h2>Special Feature</h2>
              <p>{featuresData}</p> */}
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
              style={{ color: "white" }}
              onClick={handleArrowClick}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Character;
