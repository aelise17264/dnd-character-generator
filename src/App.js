import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";

function App() {
  let navigate = useNavigate();
  const navToCharacter = () => navigate("/character", { replace: true });

  const navToMonster = () => navigate("/monsters", { replace: true });

  const navToTreasure = () => navigate("/treasure", { replace: true });

  return (
    <div className="App">
      <div id="buffer"></div>
      <div className="scroll">
        <div className="welcome">
          <h2 style={{ fontWeight: "bold" }}>Welcome Traveler</h2>
          <p>
            This chaotically ruled tool is your one stop shop for quickly
            maneuvering through the world of Dungeons & Dragons (5e) with a
            level 1 party.
          </p>
          <p>Roll the dice bellow for random choices from each category.</p>
        </div>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ backgroundColor: "#966919", border: "none" }}
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
          style={{ backgroundColor: "#6E260E", border: "none" }}
          onClick={navToTreasure}
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
          onClick={navToMonster}
        >
          <a>
            <FontAwesomeIcon icon={faDiceD20} spin style={{ color: "white" }} />{" "}
          </a>
          Roll for Monster
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
