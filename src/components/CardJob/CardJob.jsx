import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faRocket } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function CardJob({ image, title, type, link }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/trabajos/${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="card-def card-job"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p>{type}</p>
      <div className="card-job-btns">
        <Link to={`/trabajos/${link}`}>
          Explorar
          <FontAwesomeIcon className="rocket" icon={faRocket} />
        </Link>
        <button className="btn-share" onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        {copied && <div className="copy-popup">¡Enlace copiado!</div>}
      </div>
    </div>
  );
}

export default CardJob;
