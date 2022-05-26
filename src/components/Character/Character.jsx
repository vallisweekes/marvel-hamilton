import React from "react";
import "./Character.css";

const Character = ({ character, index }) => {
  return (
    <div className={`character character-${index}`}>
      <div className="character_img">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <div className="character_name">{character.name}</div>
    </div>
  );
};

export default Character;
