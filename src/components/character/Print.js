//https://i.pinimg.com/736x/fb/72/c6/fb72c6c30b5cb8f6bcef9ea9fe9d840a--high-fantasy-fantasy-rpg.jpg
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faScroll } from "@fortawesome/free-solid-svg-icons";

const Print = () => {
  const componentRef = useRef();
  const location = useLocation();
  const finalCall = location.state;
  let armorMod;
  if (finalCall[7] == "Studded Leather Armor") {
    armorMod = 12;
  } else {
    armorMod = 11;
  }

  console.log(finalCall);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="printPage">
      <a id="arrow">
        <FontAwesomeIcon
          icon={faScroll}
          size="2xl"
          style={{ color: "white" }}
          onClick={handlePrint}
        />
      </a>
      <div className="wholeForm" ref={componentRef}>
        <form>
          <h1>Race: {finalCall[0]}</h1>
          <h1>Class: {finalCall[1]}</h1>
          <h1>Alignment: {finalCall[2]}</h1>
          <h1>Traits: {finalCall[3]}</h1>
          <h1>Special Feature: {finalCall[4]}</h1>
          <h1>Languages: {finalCall[5]}</h1>
          <h1>Equipment: {finalCall[6]}</h1>
          <h1>Armor: {finalCall[7]}</h1>
          <h1>Stats:</h1>
          <h2>Str {finalCall[8][0]}</h2>
          <h2>Dex {finalCall[8][1]}</h2>
          <h2>Con {finalCall[8][2]}</h2>
          <h2>Int {finalCall[8][3]}</h2>
          <h2>Wisdom {finalCall[8][4]}</h2>
          <h2>Char {finalCall[8][5]}</h2>
          <h1>Spell Slots:</h1>
          <h2>Spells {finalCall[9].spells}</h2>
          <h2>Cantrips {finalCall[9].cantrips}</h2>
          <h1>Racial Bonuses: {finalCall[10]}</h1>
          <p>Hit Points d8 + your Con modifier</p>
          <p>Armor Class {armorMod} + your Dex modifier</p>
        </form>
      </div>

      {/* <button onClick={handlePrint}>Print this out!</button> */}
    </div>
  );
};

export default Print;
