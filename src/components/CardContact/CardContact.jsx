import { Link } from "react-router-dom";

function CardContact({ image, title, description, link, className, btnMsg }) {
  return (
    <div className={`card-def card-contact ${className}`}>
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <Link to={`${link}`}>{btnMsg}</Link>
    </div>
  );
}

export default CardContact;
