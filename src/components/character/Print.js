//https://i.pinimg.com/736x/fb/72/c6/fb72c6c30b5cb8f6bcef9ea9fe9d840a--high-fantasy-fantasy-rpg.jpg
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import {
  faScroll,
  faHouseCrack,
  faSignsPost,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const Print = () => {
  const componentRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const finalCall = location.state;
  let armorMod;
  if (finalCall[7] === "Studded Leather Armor") {
    armorMod = 12;
  } else {
    armorMod = 11;
  }

  useEffect(() => {
    getBonusList();
  }, []);

  const getBonusList = () => {
    let rbList = document.getElementById("bonusList");
    for (var i = 0; i < finalCall[10].length; i++) {
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navTop = () => {
    navigate("/Character", { replace: true });
  };

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
    <div className="printPage">
      <div className="buttons navbar" style={{ width: "auto" }}>
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
                style={{ color: "white", marginRight: "4px" }}
              />
            </a>
            Print Page
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-lg homeButton"
            id="homeButton"
            style={{
              backgroundColor: "#282c34",
              border: "none",
              width: "175px",
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
                Take Them With You
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
                Give your character a final look over and hit "Print Page" when
                you're ready to go adventuring. If you want to change anything
                or create a new character click "Back to Start" to head back to
                the top of the Character Builder.
              </p>

              <a>
                <img
                  className="heroModal"
                  src="https://qph.cf2.quoracdn.net/main-qimg-cd5679e511a8d612641c4ccd49893d4c"
                />
              </a>
              <h6
                style={{
                  fontFamily: "Recursive, sans-serif",
                  fontStyle: "italic",
                  marginTop: "5%",
                }}
              >
                Remember when you click "Back Home" your character will be
                completely wiped so make sure to save or print your character
                sheet before you leave
              </h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={hideModal}
              >
                Onward!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="characterHeader" style={{ color: "#282c34" }}>
        <h1>Print Page</h1>
      </div>
      <div className="wholeForm" id="wholePrintForm" >
        <form className="printForm" ref={componentRef}>
          <div className="firstForm">
            <h2>Race: {finalCall[0]}</h2>
            <h2>Class: {finalCall[1]}</h2>
            <h2>Alignment: {finalCall[2]}</h2>
            <h2>Traits: </h2>
            <ul>
              <li>{finalCall[3][0]}</li>
              <li>{finalCall[3][1]}</li>
            </ul>
            <div className="printFeature">
              <h2>Special Feature: </h2>
              <p>{finalCall[4]}</p>
            </div>
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
            <div className="printArmor">
              <h2>Armor: </h2>
              <p>{finalCall[7]}</p>
            </div>
            <p>Armor Class {armorMod} + your Dex mod</p>
          </div>
          <div className="secondForm">
            <div className="printStats">
              <h2>Stats:</h2>
              <ul>
                <li>Str {finalCall[8][0]}</li>
                <li>Dex {finalCall[8][1]}</li>
                <li>Con {finalCall[8][2]}</li>
                <li>Int {finalCall[8][3]}</li>
                <li>Wisdom {finalCall[8][4]}</li>
                <li>Char {finalCall[8][5]}</li>
              </ul>
            </div>
            <h2>Racial Bonuses:</h2>
            <ul id="bonusList"></ul>
            <h2>Spell Slots:</h2>
            <ul>
              <li>Spells {finalCall[9].spells}</li>
              <li>Cantrips {finalCall[9].cantrips}</li>
            </ul>
            <p>Hit Points d8 + your Con mod</p>
            <p id="skillP">Skill Proficiencies: {finalCall[11]}</p>
          </div>
        </form>
      </div>
      {/* <button onClick={handlePrint}>Print this out!</button> */}
      <a></a>
    </div>
  );
};

export default Print;
