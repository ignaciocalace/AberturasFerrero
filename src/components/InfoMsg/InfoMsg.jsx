import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function InfoMsg({ info }) {
  return (
    <>
      <div className="info-msg">
        <h4>
          <FontAwesomeIcon
            icon={faInfo}
            beat
            transform="grow-5 left-5 up-4"
            style={{
              color: "#cc7a00",
              "--fa-animation-duration": "2s",
            }}
          />
          {"  "}
          Estamos trabajando en nuestro sector de {info}, pronto tendremos
          novedades.
        </h4>
      </div>
    </>
  );
}
