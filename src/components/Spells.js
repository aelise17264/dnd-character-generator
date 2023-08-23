import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Spells(){

    return (
        <div className="App">
          <Header />
        <div className="spellsPage">
            <h3>Spell Page</h3>
        </div>
          </div>

    )

}

export default Spells