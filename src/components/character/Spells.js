import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

import "../Components.css";

function Spells() {
  const getSpells = () => {
    console.log("spells");
  };

  return (
    <div className="spellPage">
      <div className="spells">
        <h3>Spell Page</h3>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={getSpells}
        >
          Get Spells
          <a>
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              shake
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Spells;
