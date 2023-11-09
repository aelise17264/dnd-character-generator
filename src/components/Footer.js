import "./Components.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="d6">
        <a title="If you like this site & want to show your appreciation roll the d6">
          <a
            target="_blank"
            href="https://venmo.com/u/Black-Cat-22"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faDiceD6}
              shake
              size="2xl"
              style={{ color: "white" }}
            />
          </a>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
