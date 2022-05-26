import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CharactersContext } from "../Context/Character";
import Character from "../components/Character/Character";
import Pagination from "../components/Pagination/Pagination";
import LoadSpinner from "../components/LoadSpinner/LoadSpinner";
import "../Home.css";

const Home = ({ showSidebar }) => {
  const { characters, loading } = useContext(CharactersContext);
  const [charactersPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSeachText] = useState("");

  const end = currentPage * charactersPerPage;
  const start = end - charactersPerPage;
  const currentCharacters = characters.slice(start, end);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const previous = (pageNumber) => {
    if (pageNumber === 1) return;
    setCurrentPage(pageNumber - 1);
  };

  const filteredCharacter = currentCharacters.filter((character) => {
    if (searchText === " ") {
      return character;
    } else if (
      character.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return character;
    }
  });

  const next = (pageNumber) => {
    const totalPages = Math.ceil(characters.length / charactersPerPage);
    if (currentPage === totalPages) return;
    setCurrentPage(pageNumber + 1);
  };

  return (
    <div className="home">
      <div className={`sidebar ${showSidebar ? "sidebar_open" : null}`}>
        <div className="sidebar_header">Characters</div>
        <div className="sidebar_">
          <div className="sidebar_character_nav">
            {filteredCharacter.map((character, index) => (
              <Link to={`/${character.id}`} key={index}>
                <div className="character_nav_item">{character.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={`main_content ${showSidebar ? "with_sidebar" : null}`}>
        <div className="layout_inner">
          <div className="container">
            <div className="top_section">
              <div className="input_wrapper">
                <img className="search_icon" src="./search.svg" alt="search" />
                <input
                  placeholder="Search character...."
                  onChange={(event) => {
                    setSeachText(event.target.value);
                  }}
                />
              </div>
              <Pagination
                charactersPerPage={charactersPerPage}
                totalCharacters={characters.length}
                currentPage={currentPage}
                paginate={paginate}
                previous={previous}
                next={next}
              />
            </div>
            {loading ? (
              <LoadSpinner />
            ) : (
              <div className="characters_container">
                {filteredCharacter.length > 0
                  ? filteredCharacter.map((character, index) => (
                      <Link to={`/${character.id}`} key={character.id}>
                        <Character character={character} index={index} />
                      </Link>
                    ))
                  : "No Characters Found"}
              </div>
            )}
            <Pagination
              charactersPerPage={charactersPerPage}
              totalCharacters={characters.length}
              currentPage={currentPage}
              paginate={paginate}
              previous={previous}
              next={next}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
