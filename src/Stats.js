import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

function Stats() {
  const [statData, setStatData] = useState([]);
  let statRange = [15, 14, 13, 12, 10, 8];
  function shuffle(arr) {
    console.log("inside shuffle");
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
      j = Math.floor(Math.random() * (index + 1));
      x = arr[index];
      arr[index] = arr[j];
      arr[j] = x;
    }
    return arr;
  }
  const getStats = () => {
    let newArr = shuffle(statRange);
    setStatData(newArr);
    console.log(statData);
  };

  return (
    <div className="App">
      <Header />
      <div className="statsPage">
        <h1>Stats Page</h1>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "150px",
            marginBottom: "2%",
          }}
          onClick={getStats}
        >
          Get Stats
          <a>
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              shake
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>

        <div className="statGroup">
          <h2>Strength: {statData[0]}</h2>
          <h2>Dexterity: {statData[1]}</h2>
          <h2>Constitution: {statData[2]}</h2>
          <h2>Intelligence: {statData[3]}</h2>
          <h2>Wisdom: {statData[4]}</h2>
          <h2>Charisma: {statData[5]}</h2>
        </div>
     
      <footer>
        <img src="https://assetsio.reedpopcdn.com/explorers-guide-to-wildemount-dungeons-and-dragons-tabletop-roleplaying-game-image-2.jpg?width=660&quality=80&format=jpg&auto=webp" className="explorers" />
      </footer>
      </div>
    </div>
  );
}

export default Stats;
