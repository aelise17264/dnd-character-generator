import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Dungeons and Dragons 5e Character Generator</h1>
      </header>
      <form>
        <button
          type="button"
          className="btn btn-primary"
          onClick={generateCharacter}
        >
          Generate
        </button>
        <div className="form-group">
          <label>Alignment</label>
          <input className="form-control" placeholder="Good? Bad? Ugly?" />
        </div>
        <div className="form-group">
          <label>Class</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Race</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Background</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Traits</label>
          <input className="form-control" />
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
  );
}

export default App;

const abilityStats = [15, 14, 13, 12, 10, 8];
const basicPerception = 10;
// Attack modifiers
// const attackRange = dex + profModifier
// const attackBasicRange = dex
// const attackMele = strength + profModifier
// const attackBasicMele = strength

// armor class
const baseURL = "https://www.dnd5eapi.co/api/";
function generateCharacter() {
  axios.get(`https://www.dnd5eapi.co/api/races`).then(function (res) {
    var newCharList = res.data;
    var newCharIndex = Math.floor(Math.random() * 10);
    return newCharList[newCharIndex];
  });

  // console.log(newCharList[newCharIndex])
}
