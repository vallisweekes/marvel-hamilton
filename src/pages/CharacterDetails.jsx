import React, { useEffect, useContext, useState, Fragment } from "react";
import { CharactersContext } from "../Context/Character";
import { useParams, useNavigate } from "react-router-dom";
import "../CharacterDetails.css";
import Modal from "../components/Modal/Modal";
const CharacterDetails = () => {
  const { characters } = useContext(CharactersContext);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  const showModal = (itemName) => {
    if (character[itemName].items.length === 0) return;
    if (itemName === "events") {
      setModalContent({ title: itemName, items: character.events.items });
    }
    if (itemName === "stories") {
      setModalContent({ title: itemName, items: character.stories.items });
    }
    if (itemName === "series") {
      setModalContent({ title: itemName, items: character.series.items });
    }
  };

  const close = () => {
    console.log("cliec");
    setModalContent(null);
  };

  useEffect(() => {
    const selectedCharacter = characters.find(
      (characterObj) => characterObj.id.toString() === id
    );
    console.log(selectedCharacter);
    if (!id || !selectedCharacter) {
      navigate("/");
      return;
    }

    setCharacter(selectedCharacter);
  }, [characters, id, navigate]);

  return (
    <Fragment>
      {modalContent ? (
        <Modal modalContent={modalContent} close={close} />
      ) : null}
      <div className="character_details">
        <div className="layout_inner">
          <div className="container">
            <div className="top_bar" onClick={() => navigate("/")}>
              <img src="./back.png" alt="back" />
              <span>Back</span>
            </div>
            <div className="character_details_content">
              <div className="details">
                <div className="left">
                  {character.thumbnail ? (
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                  ) : null}
                </div>
                <div className="right">
                  <h2 className="character_name">{character.name}</h2>
                  <div className="character_description">
                    {character.description
                      ? character.description
                      : "No description available."}
                  </div>
                  <div className="btn_wrapper">
                    <div
                      className="character_appearances"
                      onClick={() => showModal("stories")}
                    >
                      <h4>
                        Stories ({" "}
                        {character.stories ? character.stories.items.length : 0}
                        )
                      </h4>
                    </div>
                    <div
                      className="character_appearances"
                      onClick={() => showModal("events")}
                    >
                      <h4>
                        Events
                        <span>
                          ({" "}
                          {character.events ? character.events.items.length : 0}
                          )
                        </span>
                      </h4>
                    </div>
                    <div
                      className="character_appearances"
                      onClick={() => showModal("series")}
                    >
                      <h4>
                        Series{" "}
                        <span>
                          ({" "}
                          {character.series ? character.series.items.length : 0}
                          )
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CharacterDetails;
