import { Link } from "react-router-dom";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardContact({
  image,
  title,
  description,
  description1,
  link,
  link1,
  className,
}) {
  return (
    <div
      className={`card-def card-contact ${className}`}
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div className="card-contact-title">
        <img src={image} alt={title} loading="lazy" /> <h3>{title}</h3>
      </div>
      <div className="card-contact-text">
        <Link to={`${link}`}>
          <FontAwesomeIcon icon={faHandPointer} />
          {description}
        </Link>
        <Link to={`${link1}`}>
          <FontAwesomeIcon icon={faHandPointer} />
          {description1}
        </Link>
      </div>
    </div>
  );
}

export default CardContact;
