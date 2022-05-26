import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";
import { CharacterProvider } from "./Context/Character";
import "./App.css";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="burger_icon" onClick={() => toggleSideBar()}>
            <img src="./menu.svg" alt="cancel" />
          </div>
          <h1>VW Marvel</h1>
        </header>
        <CharacterProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showSidebar={showSidebar} />}
            />
            <Route path="/:id" element={<CharacterDetails />} />
          </Routes>
        </CharacterProvider>
      </div>
    </Router>
  );
};

export default App;
