import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import "./Components.css";

function Treasure() {
  const getTreasure = () => {
    console.log("TREASURE");
  };

  return (
    <div className="treasurePage">
      <div className="treasure">
        <h3>Treasure Page</h3>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#282c34",
            border: "none",
            width: "175px",
            marginBottom: "2%",
          }}
          onClick={getTreasure}
        >
          Get Loot
          <a>
            <FontAwesomeIcon
              icon={faCoins}
              style={{ color: "white", marginLeft: "7px" }}
            />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Treasure;
