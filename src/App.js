import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min)
  }

  const getCharName = () => {
    axios
      .get(`https://www.dnd5eapi.co/api/races`)
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
    axios.get('https://www.dnd5eapi.co/api/alignments').then((res) => {
      let alignmentList = res.data.results
      let alignmentIndex = Math.floor(Math.random() * 10);
      setAlignmentData(alignmentList[alignmentIndex].name)

    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const getClass = () =>{
    axios.get('https://www.dnd5eapi.co/api/classes').then((res) =>{
      let classList = res.data.results
      let classIndex = randomNumber(1, 12)
      setClassData(classList[classIndex].name)
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const getTraits = () =>{
    axios.get('https://www.dnd5eapi.co/api/traits').then((res) =>{
      let traitList = res.data.results
      let firstTraitIndex = randomNumber(1, 38)
      let secondTraitIndex = randomNumber(1, 38)
      setTraitsData([traitList[firstTraitIndex].name, traitList[secondTraitIndex].name])
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const createCharacter = () => {
    getAlignment();
    getCharName();
    getClass();
    getTraits();
  }

useEffect(() =>{
  createCharacter()
}, [])




  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Dungeons and Dragons 5e Character Generator</h1>
      </header>
      <div className="generate">
        <button
          type="button"
          className="btn btn-primary"
          onClick={generateCharacter}
        >
          Generate
        </button>
      </div>
      <div id="hideForm">
              <img id="dice" src="https://us.123rf.com/450wm/lineartestpilot/lineartestpilot2004/lineartestpilot200403428/145472044-tattoo-in-black-line-style-of-a-d20-dice.jpg?ver=6"/>

        <form>
          <div className="form-group">
            <label>Alignment</label>
            <h2>{alignmentData}</h2>
            {/* <input className="form-control"/> */}
          </div>
          <div className="form-group">
            <label>Class</label>
            <h2 id="classType">{classData}</h2>
            {/* <input type="text" className="form-control" placeholder="" value="$newCharName" /> */}
          </div>
          <div className="form-group">
            <label>Race</label>
            <h2 id="charName">{nameData}</h2>

          </div>
          <div className="form-group">
            <label>Random Traits</label>
            <h2>{traitData[0]}</h2>
            <h2>{traitData[1]}</h2>
          </div>
          <div className="form-group">
            <label>Features</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Languages</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Equipment</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Armor</label>
            <input className="form-control" />
          </div>
        </form>
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
  document.getElementById("hideForm").style.display = "flex";
  // console.log(newCharList[newCharIndex])
  // return newCharName
}
