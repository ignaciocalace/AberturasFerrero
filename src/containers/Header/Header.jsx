import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";

const Header = ({ onShowChange }) => {
  return (
    <header>
      <NavBar onShowChange={onShowChange} />
    </header>
  );
};

export default Header;
