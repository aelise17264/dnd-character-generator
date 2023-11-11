import axios from "axios";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { characterSpellSlots } from "../../api/CharacterSpellSlots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statBonuses } from "../../api/StatList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import {
  faWandMagicSparkles,
  faSignsPost,
  faHouseCrack,
  faScroll,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

function Stats() {
  const [statData, setStatData] = useLocalStorage("stats", []);
  const [spellData, setSpellData] = useLocalStorage("spells", []);
  const [skillData, setSkillData] = useLocalStorage("skills", "");
  let statRange = [15, 14, 13, 12, 10, 8];

  const location = useLocation();
  const charData = location.state.nameData;
  let charClass = location.state.classData;
  const playerBonus = statBonuses[charData];
  // eslint-disable-next-line
  const getBonuses = playerBonus?.map((stat) => {
    return <li className="bonus">{stat}</li>;
  });

  function shuffle(arr) {
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
  };

  const getSkills = () => {
    charClass = location.state.classData.toLowerCase();
    axios
      .get("https://www.dnd5eapi.co/api/classes/" + charClass)
      .then((res) => {
        let charDetails = res.data;
        setSkillData(charDetails.proficiency_choices[0].desc);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSpellSlots = () => {
    characterSpellSlots.forEach((slot) => {
      if (slot.index === charClass) {
        setSpellData(slot);
      }
    });
  };
  const handleButtonClick = () => {
    getStats();
    getSpellSlots();
    getSkills();
  };

  const finalCharacter = [
    location.state.nameData,
    location.state.classData,
    location.state.alignmentData,
    location.state.traitData,
    location.state.featuresData,
    location.state.languageData,
    location.state.equipmentData,
    location.state.armorData,
    statData,
    spellData,
    playerBonus,
    skillData,
  ];

  let navigate = useNavigate();
  const navTop = () => navigate("/Character", { replace: true });
  const handleNavToPrint = () =>
    navigate("/Print", {
      replace: true,
      state: finalCharacter,
    });
  const goHome = () => navigate("/", { replace: true });
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
    <div className="statsPage">
      <div className="buttons navbar" style={{ paddingTop: "2%" }}>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg homeButton"
            id="charButton"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "200px",
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
            Back to Start
          </button>
        </div>
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
              width: "150px",
              marginBottom: "2%",
            }}
            onClick={handleButtonClick}
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
        </div>
        <div className="statButton">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            id="statHomeButton"
            onClick={goHome}
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
                Get those Numbers!
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                On the Stats & Spells page click the "Get Stats" button to
                randomly genrate your general stats. Want to to reshuffel your
                general stats? Just click the button again (the other info on
                the page should not change). Your character's skill proficiences
                and spell slots based off your class will be displayed when you
                click the Stats button as well. If you go back and roll for a
                new character, when you click back to the Stats page you'll need
                to re-roll all the stats to match your new character. Happy with
                your stats? Click the scroll to move to print or save your
                character.
              </p>

              <a>
                <img
                  alt="Dice Roll"
                  className="diceModal"
                  src="https://i.pinimg.com/736x/85/d1/d7/85d1d7ca6b2eed36a98fc59761637845.jpg"
                />
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={hideModal}
              >
                Rolling Rolling Rolling
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="characterHeader">
        <h1>Character Builder: Stats & Spells</h1>
      </div>

      <div className="statGroup">
        <div className="groupOne">
          <h2>General Stats</h2>
          <ul>
            <li>Strength: {statData[0]}</li>
            <li>Dexterity: {statData[1]}</li>
            <li>Constitution: {statData[2]}</li>
            <li>Intelligence: {statData[3]}</li>
            <li>Wisdom: {statData[4]}</li>
            <li>Charisma: {statData[5]}</li>
          </ul>
          <h2>Racial Bonuses</h2>
          <ul id="playerStats">{getBonuses}</ul>
        </div>
        <div className="groupTwo">
          <h2>Skill Proficiencies</h2>
          <p>{skillData}</p>
          <h2>Spell Slots</h2>

          <p>Spells: {spellData.spells}</p>
          <p>Cantrips: {spellData.cantrips}</p>
        </div>
      </div>
      <div className="toPrint">
        <button
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "transparent",
            border: "none",
            width: "450px",
            marginBottom: "2%",
            marginTop: "2%",
            fontSize: "xx-large",
          }}
          onClick={handleNavToPrint}
        >
          <a className="arrow">
            <FontAwesomeIcon icon={faScroll} style={{ color: "white" }} />
          </a>
          Print Character Sheet
        </button>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default Stats;
