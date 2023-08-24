import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";

const Header = (props) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header>
      <NavBar />
    </header>
  );
};

export default Header;
