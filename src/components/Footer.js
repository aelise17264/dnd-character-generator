import "./Components.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { nameList } from "../api/NameList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";
import { faDiceD6, faRightLong } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="d6">
        <span title="If you like this site & want to show your appreciation roll the d6">
          <a target="_blank" href="https://venmo.com/u/Black-Cat-22">
            <FontAwesomeIcon
              icon={faDiceD6}
              shake
              size="2xl"
              style={{ color: "white" }}
            />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
