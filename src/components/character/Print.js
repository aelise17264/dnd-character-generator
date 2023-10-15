//https://i.pinimg.com/736x/fb/72/c6/fb72c6c30b5cb8f6bcef9ea9fe9d840a--high-fantasy-fantasy-rpg.jpg
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faScroll,
  faHouseCrack,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";

const Print = () => {
  const componentRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const finalCall = location.state;
  let armorMod;
  if (finalCall[7] == "Studded Leather Armor") {
    armorMod = 12;
  } else {
    armorMod = 11;
  }

  useEffect(() => {
    getBonusList();
  }, []);

  const getBonusList = () => {
    console.log("rb list", finalCall[10]);
    let rbList = document.getElementById("bonusList");
    for (var i = 0; i < finalCall[10].length; i++) {
      console.log("inside loop", finalCall[10][i]);
      let bonus = finalCall[10][i];
      let rb = document.createElement("li");
      rb.textContent = bonus;
      rb.value = bonus;
      rbList.appendChild(rb);
    }
  };
  const navHome = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  // console.log(finalCall);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navTop = () => {
    navigate("/Character", { replace: true });
  };

  return (
    <div className="printPage">
      <div className="buttons">
        <button
          type="button"
          className="btn btn-primary btn-lg homeButton"
          id="charButton"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
            marginRight: "2%",
          }}
          onClick={navTop}
        >
          <a style={{ paddingRight: "2%" }}>
            <FontAwesomeIcon
              icon={faSignsPost}
              size="xl"
              style={{ color: "white" }}
            />
          </a>
          Back to Character Page
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg homeButton"
          id="printButton"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
            marginRight: "2%",
          }}
          onClick={handlePrint}
        >
          <a id="arrow">
            <FontAwesomeIcon
              icon={faScroll}
              size="xl"
              style={{ color: "white" }}
            />
          </a>
          Print Page
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
      <div className="wholeForm" ref={componentRef}>
        <form className="printForm">
          <div className="firstForm">
            <h2>Race: {finalCall[0]}</h2>
            <h2>Class: {finalCall[1]}</h2>
            <h2>Alignment: {finalCall[2]}</h2>
            <h2>Traits: </h2>
            <ul>
              <li>{finalCall[3][0]}</li>
              <li>{finalCall[3][1]}</li>
            </ul>
            <h2>Special Feature: {finalCall[4]}</h2>
            <h2>Languages: </h2>
            <ul>
              <li>{finalCall[5][0]}</li>
              <li>{finalCall[5][1]}</li>
            </ul>
            <h2>Equipment: </h2>
            <ul>
              <li>{finalCall[6][0]}</li>
              <li>{finalCall[6][1]}</li>
              <li>{finalCall[6][2]}</li>
            </ul>
            <h2>Armor: {finalCall[7]}</h2>
            <p>Hit Points d8 + your Con modifier</p>
            <p>Armor Class {armorMod} + your Dex modifier</p>
          </div>
          <div className="secondForm">
            <h2>Stats:</h2>
            <ul>
              <li>Str {finalCall[8][0]}</li>
              <li>Dex {finalCall[8][1]}</li>
              <li>Con {finalCall[8][2]}</li>
              <li>Int {finalCall[8][3]}</li>
              <li>Wisdom {finalCall[8][4]}</li>
              <li>Char {finalCall[8][5]}</li>
            </ul>
            <h2>Spell Slots:</h2>
            <ul>
              <li>Spells {finalCall[9].spells}</li>
              <li>Cantrips {finalCall[9].cantrips}</li>
            </ul>
            <h2>Racial Bonuses:</h2>
            <ul id="bonusList"></ul>
          </div>
        </form>
      </div>
      {/* <button onClick={handlePrint}>Print this out!</button> */}
      <a></a>
    </div>
  );
};

export default Print;
