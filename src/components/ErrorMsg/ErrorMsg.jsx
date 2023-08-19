import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ErrorMsg() {
  return (
    <>
      <div className="error-msg">
        <h4>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            beat
            transform="grow-5 left-5 up-4"
            style={{
              color: "#c20000",
              "--fa-animation-duration": "2s",
            }}
          />
          {"  "}
          Oops! Parece que hemos encontrado un problema.
          <strong> Por favor, intenta recargar la página.</strong> Si el
          inconveniente continúa, estaremos trabajando para solucionarlo lo más
          pronto posible. ¡Gracias por tu paciencia!
        </h4>
      </div>
    </>
  );
}
