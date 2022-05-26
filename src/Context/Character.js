import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CharactersContext = createContext();
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get("http://gateway.marvel.com/v1/public/characters", {
          params: { apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY },
        });

        setCharacters(data.results);
        setLoading(false);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <CharactersContext.Provider value={{ characters, loading }}>
      {children}
    </CharactersContext.Provider>
  );
};
