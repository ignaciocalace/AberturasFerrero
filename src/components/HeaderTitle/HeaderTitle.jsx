import React from "react";

function HeaderTitle({ text, backgroundImage = "/img/imgFixed/contacto.jpg" }) {
  const isMobile = window.innerWidth <= 695;

  return (
    <div
      className="header-with-image"
      style={{
        backgroundImage: isMobile ? "none" : `url(${backgroundImage})`,
      }}
    >
      <h2>{text}</h2>
    </div>
  );
}

export default HeaderTitle;
